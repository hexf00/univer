/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { ICommand, IMutationInfo, JSONXActions } from '@univerjs/core';
import {
    CommandType,
    ICommandService,
    IUniverInstanceService,
    JSONX,
    MemoryCursor,
    TextX,
    TextXActionType,
} from '@univerjs/core';
import type { IAccessor } from '@wendellhu/redi';
import type { IRichTextEditingMutationParams } from '@univerjs/docs';
import { getRichTextEditPath, RichTextEditingMutation } from '@univerjs/docs';
import { type ITextRangeWithStyle, ITextSelectionRenderManager } from '@univerjs/engine-render';
import type { IDeleteDrawingCommandParams } from './interfaces';

/**
 * The command to remove new sheet image
 */
export const RemoveDocDrawingCommand: ICommand = {
    id: 'doc.command.remove-doc-image',
    type: CommandType.COMMAND,
    // eslint-disable-next-line max-lines-per-function
    handler: (accessor: IAccessor, params?: IDeleteDrawingCommandParams) => {
        const commandService = accessor.get(ICommandService);
        const univerInstanceService = accessor.get(IUniverInstanceService);
        const textSelectionRenderManager = accessor.get(ITextSelectionRenderManager);
        const documentDataModel = univerInstanceService.getCurrentUniverDocInstance();

        if (params == null || documentDataModel == null) {
            return false;
        }

        const { drawings: removeDrawings } = params;

        const segmentId = textSelectionRenderManager.getSegment() ?? '';

        const textX = new TextX();
        const jsonX = JSONX.getInstance();
        const customBlocks = documentDataModel.getSelfOrHeaderFooterModel(segmentId).getBody()?.customBlocks ?? [];
        const removeCustomBlocks = removeDrawings
            .map((drawing) => customBlocks.find((customBlock) => customBlock.blockId === drawing.drawingId))
            .filter((block) => !!block)
            .sort((a, b) => a!.startIndex > b!.startIndex ? 1 : -1);

        const unitId = removeDrawings[0].unitId;

        const memoryCursor = new MemoryCursor();

        memoryCursor.reset();

        const cursorIndex = removeCustomBlocks[0]!.startIndex;
        const textRanges = [
            {
                startOffset: cursorIndex,
                endOffset: cursorIndex,
            },
        ] as ITextRangeWithStyle[];

        const doMutation: IMutationInfo<IRichTextEditingMutationParams> = {
            id: RichTextEditingMutation.id,
            params: {
                unitId,
                actions: [],
                textRanges,
            },
        };

        const rawActions: JSONXActions = [];

        for (const block of removeCustomBlocks) {
            const { startIndex } = block!;

            if (startIndex > memoryCursor.cursor) {
                textX.push({
                    t: TextXActionType.RETAIN,
                    len: startIndex - memoryCursor.cursor,
                    segmentId: '',
                });
            }

            textX.push({
                t: TextXActionType.DELETE,
                len: 1,
                line: 0,
                segmentId: '',
            });

            memoryCursor.moveCursorTo(startIndex + 1);
        }

        const path = getRichTextEditPath(documentDataModel, segmentId);
        rawActions.push(jsonX.editOp(textX.serialize(), path)!);

        for (const block of removeCustomBlocks) {
            const { blockId } = block!;

            const drawing = (documentDataModel.getDrawings() ?? {})[blockId];
            const drawingOrder = documentDataModel.getDrawingsOrder();
            const drawingIndex = drawingOrder!.indexOf(blockId);

            const removeDrawingAction = jsonX.removeOp(['drawings', blockId], drawing);
            const removeDrawingOrderAction = jsonX.removeOp(['drawingsOrder', drawingIndex], blockId);

            rawActions.push(removeDrawingAction!);
            rawActions.push(removeDrawingOrderAction!);
        }

        doMutation.params.actions = rawActions.reduce((acc, cur) => {
            return JSONX.compose(acc, cur as JSONXActions);
        }, null as JSONXActions);

        const result = commandService.syncExecuteCommand<
            IRichTextEditingMutationParams,
            IRichTextEditingMutationParams
        >(doMutation.id, doMutation.params);

        return Boolean(result);
    },
};

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

export { UniverDocsDrawingPlugin } from './plugin';
export { type IDocDrawing, IDocDrawingService, DocDrawingService } from './services/doc-drawing.service';

export { DOCS_DRAWING_PLUGIN, type IDocDrawingModel } from './controllers/doc-drawing.controller';

// #region - all commands

export { SetDocDrawingApplyMutation, DocDrawingApplyType, type ISetDrawingApplyMutationParams } from './commands/mutations/set-drawing-apply.mutation';
// #endregion

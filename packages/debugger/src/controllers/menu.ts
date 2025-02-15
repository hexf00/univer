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

import { LocaleType } from '@univerjs/core';
import { defaultTheme, greenTheme } from '@univerjs/design';
import type { IMenuButtonItem, IMenuSelectorItem } from '@univerjs/ui';
import { MenuItemType, MenuPosition } from '@univerjs/ui';
import type { IAccessor } from '@wendellhu/redi';

import { ConfirmOperation } from '../commands/operations/confirm.operation';
import { DialogOperation } from '../commands/operations/dialog.operation';
import { LocaleOperation } from '../commands/operations/locale.operation';
import { MessageOperation } from '../commands/operations/message.operation';
import { NotificationOperation } from '../commands/operations/notification.operation';
import { SaveSnapshotOptions } from '../commands/operations/save-snapshot.operations';
import { SetEditable } from '../commands/operations/set.editable.operation';
import { SidebarOperation } from '../commands/operations/sidebar.operation';
import { ThemeOperation } from '../commands/operations/theme.operation';
import { CreateEmptySheetCommand, DisposeCurrentUnitCommand, DisposeUniverCommand } from '../commands/commands/unit.command';
import { CreateFloatDomCommand } from '../commands/commands/float-dom.command';
import { ChangeUserCommand, UnitRole } from '../commands/operations/change-user.operation';
import { ShowCellContentOperation } from '../commands/operations/cell.operation';

export function LocaleMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: LocaleOperation.id,
        icon: 'VueI18nIcon',
        tooltip: 'i18n',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'English',
                value: LocaleType.EN_US,
            },
            {
                label: '简体中文',
                value: LocaleType.ZH_CN,
            },
            {
                label: 'Русский',
                value: LocaleType.RU_RU,
            },
            {
                label: '繁體中文',
                value: LocaleType.ZH_TW,
            },
            {
                label: 'Tiếng Việt',
                value: LocaleType.VI_VN,
            },
        ],
    };
}

export function ThemeMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: ThemeOperation.id,
        title: 'Theme',
        tooltip: 'Theme',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'green',
                value: greenTheme as any,
            },
            {
                label: 'default',
                value: defaultTheme as any,
            },
        ],
    };
}

export function NotificationMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: NotificationOperation.id,
        title: 'Notification',
        tooltip: 'Notification',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'Notification Success',
                value: 'Notification Success random string to test Notification Success random string to test Notification Success random string to test Notification Success random string to test Notification Success random string to test',
            },
            {
                label: 'Notification Info',
                value: 'Notification Info',
            },
            {
                label: 'Notification Warning',
                value: 'Notification Warning',
            },
            {
                label: 'Notification Error',
                value: 'Notification Error',
            },
        ],
    };
}

export function DialogMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: DialogOperation.id,
        title: 'Dialog',
        tooltip: 'Dialog',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'Open Dialog',
                value: 'dialog',
            },
            {
                label: 'Draggable Dialog',
                value: 'draggable',
            },
        ],
    };
}

export function ConfirmMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: ConfirmOperation.id,
        title: 'Confirm',
        tooltip: 'Confirm',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'Open confirm',
                value: 'confirm',
            },
        ],
    };
}

export function MessageMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: MessageOperation.id,
        title: 'Message',
        tooltip: 'Message',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'Open message',
                value: '',
            },
        ],
    };
}

export function SidebarMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: SidebarOperation.id,
        title: 'Sidebar',
        tooltip: 'Sidebar',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'Open sidebar',
                value: 'open',
            },
            {
                label: 'Close sidebar',
                value: 'close',
            },
        ],
    };
}

export function SetEditableMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: SetEditable.id,
        title: 'Editable',
        tooltip: 'Editable',
        type: MenuItemType.SELECTOR,
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'changeUniverEditable',
                value: 'univer',
            },
            {
                label: 'changeSheetEditable',
                value: 'sheet',
            },
        ],
    };
}

export function SaveSnapshotSetEditableMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: SaveSnapshotOptions.id,
        type: MenuItemType.SELECTOR,
        title: 'Snapshot',
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'saveWorkbook',
                value: 'workbook',
            },
            {
                label: 'saveSheet',
                value: 'sheet',
            },
            {
                label: 'record',
                value: 'record',
            },
        ],
    };
}

const UNIT_ITEM_MENU_ID = 'debugger.unit-menu-item';

export function UnitMenuItemFactory(accessor: IAccessor): IMenuSelectorItem {
    return {
        id: UNIT_ITEM_MENU_ID,
        title: 'Dispose',
        tooltip: 'Lifecycle Related Commands',
        type: MenuItemType.SUBITEMS,
        positions: [MenuPosition.TOOLBAR_OTHERS],
    };
}

export function DisposeUniverItemFactory(_accessor: IAccessor): IMenuButtonItem {
    return {
        id: DisposeUniverCommand.id,
        title: 'Dispose Univer',
        tooltip: 'Dispose the Univer instance',
        icon: 'DS',
        type: MenuItemType.BUTTON,
        positions: [UNIT_ITEM_MENU_ID],
    };
}

export function DisposeCurrentUnitMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: DisposeCurrentUnitCommand.id,
        title: 'Dispose Current Unit',
        tooltip: 'Dispose Current Unit',
        icon: 'DS',
        type: MenuItemType.BUTTON,
        positions: [UNIT_ITEM_MENU_ID],
    };
}

export function CreateEmptySheetMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: CreateEmptySheetCommand.id,
        title: 'Create Another Sheet',
        tooltip: 'Create Another Sheet',
        icon: 'CR',
        type: MenuItemType.BUTTON,
        positions: [UNIT_ITEM_MENU_ID],
    };
}

const FLOAT_DOM_ITEM_MENU_ID = 'debugger.float-dom-menu-item';

export function FloatDomMenuItemFactory(): IMenuSelectorItem {
    return {
        id: FLOAT_DOM_ITEM_MENU_ID,
        title: 'FloatDom',
        tooltip: 'Float Dom Commands',
        type: MenuItemType.SUBITEMS,
        positions: [MenuPosition.TOOLBAR_OTHERS],
    };
}

export function CreateFloatDOMMenuItemFactory(): IMenuButtonItem {
    return {
        id: CreateFloatDomCommand.id,
        title: 'Create Float Dom',
        tooltip: 'Create Float Dom',
        icon: 'DS',
        type: MenuItemType.BUTTON,
        positions: [FLOAT_DOM_ITEM_MENU_ID],
    };
}

export function ShowCellContentMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
    return {
        id: ShowCellContentOperation.id,
        type: MenuItemType.BUTTON,
        title: 'Cell',
        positions: [FLOAT_DOM_ITEM_MENU_ID],
        icon: 'DS',
    };
}

export function ChangeUserMenuItemFactory(): IMenuSelectorItem {
    return {
        id: ChangeUserCommand.id,
        type: MenuItemType.SELECTOR,
        title: 'Change User',
        positions: [MenuPosition.TOOLBAR_OTHERS],
        selections: [
            {
                label: 'Owner',
                value: UnitRole.Owner,
            },
            {
                label: 'Editor',
                value: UnitRole.Editor,
            },
            {
                label: 'Reader',
                value: UnitRole.Reader,
            },

        ],
    };
}


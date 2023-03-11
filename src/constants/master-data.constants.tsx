import React from 'react';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import { MenuItem } from '../models/common.model';
import { APP_ROUTER } from './router.constants';
import ClassIcon from '@material-ui/icons/Class';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InfoIcon from '@material-ui/icons/Info';
export const MENU_DATA: MenuItem[] = [
    {
        icon: <MenuBookRoundedIcon />,
        name: 'Quản lý bài kiểm tra',
        routing: APP_ROUTER.MANAGE_TEST,
    },
    {
        icon: <QuestionAnswerIcon />,
        name: 'Quản lý câu hỏi',
        routing: APP_ROUTER.MANAGE_QUESTION,
    },
    {
        icon: <ClassIcon />,
        name: 'Lớp học',
        routing: APP_ROUTER.CLASS.ALL_BY_TEACHER,
    },
    {
        icon: <DeleteIcon />,
        name: 'Thùng rác',
        routing: APP_ROUTER.TRASH_CAN,
    },
    {
        icon: <SettingsIcon />,
        name: 'Cài đặt',
    },
]
export const MENU_PROFILE: MenuItem[] = [
    {
        icon: <PermIdentityIcon />,
        name: 'Thông Tin Cá Nhân',
    },
    {
        icon: <VpnKeyIcon />,
        name: 'Mật Khẩu',
    },
    {
        icon: <InfoIcon />,
        name: 'Thông Tin Khác',
    },
]
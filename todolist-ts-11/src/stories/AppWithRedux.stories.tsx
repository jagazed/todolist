import type {Meta, StoryObj} from '@storybook/react';
import {fn} from "@storybook/test";
import { action } from '@storybook/addon-actions';
import {Task} from "../Task";
import React, {ChangeEvent, useState} from "react";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";
import {TextField} from "@mui/material";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const AppWithReduxStory: Story = {}


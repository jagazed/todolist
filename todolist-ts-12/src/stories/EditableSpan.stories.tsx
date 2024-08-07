import type {Meta, StoryObj} from '@storybook/react';
import {fn} from "@storybook/test";
import { action } from '@storybook/addon-actions';
import {Task} from "../Task";
import React, {ChangeEvent, useState} from "react";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";
import {TextField} from "@mui/material";

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

    args: {
        value: 'JS',
        onChange: fn()
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;


export const EditableSpanStory: Story = {
}
export const EditableSpanStory2: Story = {
    render: (args) => <EditableSpan value={args.value} onChange={args.onChange} />
}

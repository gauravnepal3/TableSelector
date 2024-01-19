import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { TableSelector } from '../src'

describe('Common render', () => {
    it('renders without crashing', () => {
        render(
            <TableSelector
                items={[{ value: '1', label: '1' }]}
                onChange={() => {
                    console.log('Changed')
                }}
                preSelectedItems={[]}
            />,
        )
    })
})

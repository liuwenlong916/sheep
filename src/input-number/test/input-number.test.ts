import { render } from '@testing-library/vue'
import InputNumber from '../src/input-number'

describe('input-number test', () => {
  test('input-number init render', async () => {
    const { getByRole } = render(InputNumber)
    getByRole('input-number')
  })
})

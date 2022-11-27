import { render } from '@testing-library/vue'
import Dialog from '../src/dialog'

describe('dialog test', () => {
  test('dialog init render', async () => {
    const { getByRole } = render(Dialog)
    getByRole('dialog')
  })
})

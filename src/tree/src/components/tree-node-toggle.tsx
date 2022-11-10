import { SetupContext } from 'vue'

export default (
  props: { expended: boolean; onClick: () => void },
  { emit }: SetupContext
) => {
  return (
    <svg
      onClick={() => {
        emit('onClick')
      }}
      style={{
        width: '25px',
        height: '16px',
        display: 'inline-block',
        transform: props.expended ? 'rotate(90deg)' : ''
      }}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
    </svg>
  )
}

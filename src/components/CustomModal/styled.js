import styled from "styled-components"
import { Modal } from "antd"

export const ModalWrapper = styled(Modal)`
  .ant-modal-header,
  .ant-modal-title {
    background-color: #fff;
    color: ${props =>
      props.isUser ? "var(--color-orange)" : "var(--color-primary-admin)"} !important;
  }

  .ant-modal-body {
    flex: auto;
    overflow: ${props => (props.hiddenScroll ? "hidden" : "hidden auto")};
  }
  .ant-image.css-dev-only-do-not-override-1mqg3i0 {
    width: 100%;
  }
`

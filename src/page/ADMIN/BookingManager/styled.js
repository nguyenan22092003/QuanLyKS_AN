import styled from "styled-components";

export const BookingPageStyle = styled.div`
  height: 100%;

  .list-data-left {
    .data-item {
      height: 40px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #ddd;
      padding: 0 6px;
      .btn-action {
        display: none;
      }

      &:hover {
        background-color: #e6f4ff;
        .btn-action {
          display: block;
        }
      }
    }
  }
`;

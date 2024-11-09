import styled from "styled-components";

export const DashboardStyled = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  .dash-board_item {
    border: 1px solid #ddd;
    border-radius: 12px;
    box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.3);
    width: 250px;
    height: 200px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    .dash-board_item_icon-wrap {
      border-radius: 50%;
      overflow: hidden;
      margin-right: 12px;
      width: 56px;
      height: 56px;
    }
    .dash-board_item_icon {
      font-size: 56px;
      font-weight: 600;
      background-color: #ffd666;
      padding: 12px;
    }
    .dash-board_item_title {
      font-weight: 600;
      font-size: 20px;
    }
    .dash-board_item_value {
      font-weight: 600;
      font-size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  }
`;

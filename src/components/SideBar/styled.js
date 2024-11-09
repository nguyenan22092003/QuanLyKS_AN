import styled from "styled-components";

export const SideBarStyle = styled.div`
  .wrap-section {
    height: calc(100vh - 50px);
    width: 100%;
    overflow: hidden;
    .menu-app {
      width: 256px;
      height: 100%;
      padding-top: 16px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
    .wrap-page {
      flex: 1;
      height: 100%;
      padding: 16px;
      overflow: auto;
    }
  }
`;

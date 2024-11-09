import styled from "styled-components";

export const HeaderStyle = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;

  .header-top {
    background-color: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name-contact {
      color: var(--color-red);
    }
    .phone-contact,
    .input-search,
    .cart-header {
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
    }
    .search-box {
      background-color: var(--color-yellow);
      display: flex;
      align-items: center;
      height: 100%;
      border-radius: 12px;

      input {
        border: none;
        background-color: #f0f0f0;
        height: 100%;
        padding: 2px 6px 2px 10px;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        width: 250px;
        &:hover,
        &:focus,
        &:active,
        &:focus-visible {
          border: none;
          outline: none;
        }
      }
    }
  }

  .header-app {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background-color: var(--header-bgr);
    padding: 0 20px;
    &.header-admin {
      background-color: var(--header-admin-bgr);
      .menu-header-customer {
        background-color: var(--header-admin-bgr);
      }
    }
    .header-title {
      font-size: 20px;
      margin-left: 16px;
      font-weight: 600;
      color: #fff;
    }

    .menu-header-customer {
      background-color: var(--header-bgr);
      height: 45px;
      flex: 1;
      .ant-menu-item-selected,
      .ant-menu-item-selected:hover {
        font-weight: 600;
        &::after {
          bottom: 2px;
          border-bottom-color: #fff;
        }
      }
      .ant-menu-item:hover {
        &::after {
          bottom: 2px;
          border-bottom-color: #fff;
        }
      }
      .ant-menu-title-content {
        color: #fff;
      }
      .ant-menu-submenu-selected::after,
      .ant-menu-submenu:hover::after {
        border-bottom-color: #fff;
      }
    }
  }
`;

export const StyleMenuAccount = styled.div`
  .menu-account {
    background: #f3f6fc;
    padding: 6px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 10px;
    .btn-logout {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      font-weight: 600;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: rgb(237, 17, 23);
          }
        }
      }
    }
    .btn-function {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
          }
        }
      }
    }
    .strok-btn-function {
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
            stroke: #9a9a9a;
          }
        }
      }
    }
    .ant-dropdown-menu-item {
      background: #fff !important;
      padding: 5px 0px;
    }
    .ant-dropdown-menu-item:hover {
      background: #f5f5f5 !important;
    }
    .ant-dropdown-menu {
      position: relative !important;
      width: 100% !important;
      padding: 0 !important;
      box-shadow: unset;
      background: none;
      .account-infor {
        background: #fff;
        padding: 10px;
        border-radius: 20px 20px 3px 3px;
        margin-bottom: 3px;
        .ant-divider {
          margin: 10px 0px;
        }
        .infor {
          margin-bottom: 8px;
        }
        .sumary-infor-user {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          height: 100%;
        }
      }
      .account-function {
        background: #fff;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 3px;
      }
      .account-logout {
        background: #fff;
        padding: 10px;
        border-radius: 3px 3px 20px 20px;
      }
    }
  }
`;

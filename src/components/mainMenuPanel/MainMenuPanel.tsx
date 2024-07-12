import "./mainMenuPanel.sass";

const MainMenuPanel = ({ children }: any) => {
  return (
    <>
      <section className="section-main">{children}</section>
    </>
  );
};

export default MainMenuPanel;

// import "./mainMenuPanel.sass";

// const MainMenuPanel = (props) => {
//   return (
//     <>
//       <section className="section-main">{props.children}</section>
//     </>
//   );
// };

// export default MainMenuPanel;

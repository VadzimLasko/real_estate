import "./mainMenuPanel.sass";

const MainMenuPanel = (props) => {
  return (
    <>
      <section className="section-main">{props.children}</section>
    </>
  );
};

export default MainMenuPanel;

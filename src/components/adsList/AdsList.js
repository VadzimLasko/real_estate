import { selectAll } from "./adsSlice";

const AdsList = () => {
  const renderAdsList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="ad">
          <h5>Объявлений пока нет</h5>
        </CSSTransition>
      );
    }
    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="ad">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderAdsList(selectAll);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default AdsList;

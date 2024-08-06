import "./infoMessage.sass";

interface InfoMessageProps {
  children: React.ReactNode;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ children }) => {
  return (
    <div className="info-message">
      <div className="info-message__wrapper">{children}</div>
    </div>
  );
};

export default InfoMessage;

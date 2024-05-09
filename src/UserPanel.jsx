import PropTypes from 'prop-types';
import { ImageTopics } from './ImageTopics';

export function UserPanel({
  setNewLevel,
  fetchNewImages,
  resetRound,
  setImagesTopic,
}) {
  return (
    <div className="userPanel">
      <div className="userPanelMenu">
        <button className="fetchBtn" onClick={() => setNewLevel(0)}>
          New game
        </button>
        <button className="fetchBtn" onClick={fetchNewImages}>
          New images
        </button>
        <button className="fetchBtn" onClick={resetRound}>
          Reset round
        </button>
      </div>
      <ImageTopics setImagesTopic={setImagesTopic} />
    </div>
  );
}

UserPanel.propTypes = {
  setNewLevel: PropTypes.func.isRequired,
  fetchNewImages: PropTypes.func.isRequired,
  resetRound: PropTypes.func.isRequired,
  setImagesTopic: PropTypes.func.isRequired,
};

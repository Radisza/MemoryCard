import PropTypes from 'prop-types';
import { ImageTopics } from './ImageTopics';

export function UserPanel({
  setNewLevel,
  fetchNewImages,
  resetRound,
  setImagesTopic,
  loading,
}) {
  return (
    <div className="userPanel">
      <div className="userPanelMenu">
        <button
          className="fetchBtn"
          onClick={() => setNewLevel(0)}
          disabled={loading}
        >
          New game
        </button>
        <button
          className="fetchBtn"
          onClick={fetchNewImages}
          disabled={loading}
        >
          New images
        </button>
        <button className="fetchBtn" onClick={resetRound} disabled={loading}>
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
  loading: PropTypes.bool.isRequired,
};

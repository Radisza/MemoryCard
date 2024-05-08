import PropTypes from 'prop-types';

const topics = new Set(['Any', 'Animal', 'Food', 'Landscape']);
export const DEFAULT_IMAGE_TOPIC = 'Animal';
export const NO_IMAGE_TOPIC = 'Any';

export function ImageTopics({ setImagesTopic }) {
  let options = [];
  for (const value of topics) {
    options.push(
      <option key={value} value={value}>
        {value}
      </option>
    );
  }

  return (
    <div className="imageTopicPanel">
      <label htmlFor="imageTopic"> Chools topics of your images </label>
      <select
        id="imageTopic"
        defaultValue={DEFAULT_IMAGE_TOPIC}
        onChange={(e) => setImagesTopic(e.target.value)}
      >
        {options}
      </select>
    </div>
  );
}

ImageTopics.propTypes = {
  setImagesTopic: PropTypes.func.isRequired,
};

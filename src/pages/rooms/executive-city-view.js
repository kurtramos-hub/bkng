import RoomDetail from './[id]';

export default function ExecutiveCityView() {
  return <RoomDetail />;
}

export async function getServerSideProps() {
  return {
    props: {
      id: 2
    }
  };
}
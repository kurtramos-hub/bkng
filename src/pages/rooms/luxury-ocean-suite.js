import RoomDetail from './[id]';

export default function LuxuryOceanSuite() {
  return <RoomDetail />;
}

export async function getServerSideProps() {
  return {
    props: {
      id: 1
    }
  };
}
import RoomDetail from './[id]';

export default function PremiumGardenRoom() {
  return <RoomDetail />;
}

export async function getServerSideProps() {
  return {
    props: {
      id: 3
    }
  };
}
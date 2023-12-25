export default function PlayGameButton(props: {
  game_uuid: string;
  router: any;
}) {
  function handleClick() {
    props.router.push(
      "http://localhost:3001/dashboard/game/" + props.game_uuid
    );
  }
  return <button onClick={() => handleClick()}>Jugar</button>;
}

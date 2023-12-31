export default function PlayGameButton(props: {
  game_uuid: string;
  router: any;
}) {
  function handleClick() {
    props.router.push(
      "http://localhost:3001/dashboard/game/" + props.game_uuid
    );
  }
  return (
    <button
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      onClick={() => handleClick()}
    >
      Jugar
    </button>
  );
}

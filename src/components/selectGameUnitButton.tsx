export default function SelectGameUnitButton(handleFunction: Function) {
  return (
    <button className={"w-full text-sm"} onClick={() => handleFunction()}>
      SELECT
    </button>
  );
}

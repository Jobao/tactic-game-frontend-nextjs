export function CoordInputGameUnitAction(props: { show: boolean }) {
  if (props.show) {
    return (
      <>
        <input
          className=" w-4/12"
          type="number"
          name="X"
          id="X"
          placeholder="X"
        />
        <input
          className=" w-4/12"
          type="number"
          name="Y"
          id="Y"
          placeholder="Y"
        />
      </>
    );
  }
  return <></>;
}

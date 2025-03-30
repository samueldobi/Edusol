export default function Class({
  classes,
  id,
}: {
  classes: string[];
  id: number;
}) {
  return (
    <div className="w-full p-2 md:p-6 flex flex-col space-y-3 border border-[#08CC3347] rounded-[10px]">
      <h2 className="p-2 text-center text-white bg-[#050548] text-[15px] md:text-[22px]">
        ACADEMIC RESULT FOR CLASS {id}{" "}
      </h2>
      <div className="grid grid-cols-[repeat(6,minmax(40px,82px))] gap-2 md:gap-8 mx-auto">
        {classes.map((c) => (
          <div className="border-2 border-[#00000024] p-1 md:p-2 flex items-center justify-center cursor-pointer">
            <span className="m-auto text-center">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

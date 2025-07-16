import { schoolStructure } from "@/app/lib/placeholder-data";
export default function ClassGroups() {
     const transformClasses = (classes) => 
    classes.map(item => {
      const [level, classes] = Object.entries(item)[0];
      return { level, classes };
    });
      const allLevels = [
    ...transformClasses(schoolStructure.junior),
    ...transformClasses(schoolStructure.senior)
  ];
  return (
    <>
        <div className="space-y-8">
        {allLevels.map((group) => (
            <div
            key={group.level}
            className="w-full p-2 md:p-6 flex flex-col space-y-3 border border-[#08CC3347] rounded-[10px]"
            >
            <h2 className="p-2 text-center text-white bg-[#050548] text-[15px] md:text-[22px]">
                {group.level.toUpperCase()}
            </h2>

            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4 w-full mt-5 mb-5">
                {group.classes.map((className) => (
                <div
                    key={className}
                    className="border-2 border-[#00000024] p-2 flex items-center justify-center cursor-pointer"
                >
                    {className.toUpperCase()}
                </div>
                ))}
            </div>
            </div>
        ))}
        </div>

    </>
    
  );
}
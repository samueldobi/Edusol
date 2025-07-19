
interface OtpInputProps{
    length?: number;
}

export default function OtpInput({length = 6}: OtpInputProps) {
    return (
        <div className="flex sm:mx-9 justify-between">
            {
                Array.from({length}).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        className="w-12 h-12 border-2 border-gray-300 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-[#66cc00] focus:border-[#66cc00]"
                    />
                ))
            }
        </div>
    );

}
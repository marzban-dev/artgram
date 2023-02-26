import Placeholder from "components/placeholder";

const UserPlaceholder: React.FC = () => {
    const placeholder = (
        <div className="flex justify-start items-center gap-4 w-full">
            <Placeholder height={60} width={60} circle />
            <div className="flex justify-start items-start gap-4 flex-col w-[calc(100%-140px)] mb-[6px]">
                <Placeholder height={10} width="70%" />
                <Placeholder height={10} width="80%" />
            </div>
            <Placeholder height={38} width={100} borderRadius={8}/>
        </div>
    );

    return (
        <div className="flex justify-start items-center gap-5 flex-col">
            {placeholder}
            {placeholder}
            {placeholder}
        </div>
    );
};

export default UserPlaceholder;

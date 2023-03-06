import Avatar from "components/avatar";
import Input from "components/input";
import Modal from "components/modal";
import Textarea from "components/textarea";
import LinkIcon from "public/assets/icon/link.svg";
import LocationIcon from "public/assets/icon/location-dot.svg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import validator from "validator";
import Background from "./components/background";
import { ISettingsModalProps } from "./settings-modal.types";

const SettingsModal: React.FC<ISettingsModalProps> = ({ show, setShow, settings, setSettings }) => {
    const [inputValues, setInputValues] = useState({ ...settings });
    const [errors, setErrors] = useState<{ [x: string]: string }>({});
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            if (Object.keys(errors).length === 0) {
                setSettings(inputValues);
            }
        }, 1000);
    }, [inputValues, errors]);

    const addError = (property: string, message: string) => {
        setErrors((prevErrs) => ({ ...prevErrs, [property]: message }));
    };

    const removeError = (property: string) => {
        setErrors((prevErrs) => {
            const errors = { ...prevErrs };
            delete errors[property];
            return errors;
        });
    };

    const changeUserData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, property: string) => {
        const value = e.target.value;
        setInputValues((oldValues) => ({ ...oldValues, [property]: value }));

        if (value.length !== 0) {
            switch (property) {
                case "first_name":
                    if (value.length < 6) return addError(property, "some error");
                    return removeError(property);
                case "last_name":
                    if (value.length < 6) return addError(property, "some error");
                    return removeError(property);
                case "bio":
                    if (value.length < 6) return addError(property, "some error");
                    return removeError(property);
                case "link":
                    if (!validator.isURL(value)) return addError(property, "some error");
                    return removeError(property);
                case "location":
                    if (value.length < 3) return addError(property, "some error");
                    return removeError(property);
            }
        } else removeError(property);
    };

    return (
        <Modal title="Settings" show={show} onClose={() => setShow(false)}>
            <div className="flex justify-start items-center flex-col gap-5 max-[520px]:pb-8">
                <div className="relative w-full flex justify-center items-center mb-[45px]">
                    <Background background="https://artgram.iran.liara.run/media/header.jpg" />
                    <div className="absolute bottom-[-25%] z-[30]">
                        <Avatar
                            className="w-[100px] h-[100px] shadow-xl shadow-[rgba(0,0,0,0.15)] overflow-hidden"
                            placeholderClassName="border border-[rgb(40,40,40)]"
                            picture="https://artgram.iran.liara.run/media/profile.jpg"
                            title="profile"
                            square
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center w-full gap-5">
                    <Input
                        onChange={(e) => changeUserData(e, "first_name")}
                        error={Object.hasOwn(errors, "first_name")}
                        errorMessage={errors.first_name}
                        placeholder="First name"
                        value={inputValues.first_name}
                        fullWidth
                    />
                    <Input
                        onChange={(e) => changeUserData(e, "last_name")}
                        error={Object.hasOwn(errors, "last_name")}
                        errorMessage={errors.last_name}
                        placeholder="Last name"
                        value={inputValues.last_name}
                        fullWidth
                    />
                </div>
                <Input
                    onChange={(e) => changeUserData(e, "location")}
                    error={Object.hasOwn(errors, "location")}
                    errorMessage={errors.location}
                    placeholder="Location"
                    icon={LocationIcon}
                    value={inputValues.location}
                    fullWidth
                />
                <Textarea
                    onChange={(e) => changeUserData(e, "bio")}
                    error={Object.hasOwn(errors, "bio")}
                    errorMessage={errors.bio}
                    placeholder="Biography"
                    value={inputValues.bio}
                    fullWidth
                />
                <Input
                    onChange={(e) => changeUserData(e, "link")}
                    error={Object.hasOwn(errors, "link")}
                    errorMessage={errors.link}
                    placeholder="Link"
                    value={inputValues.link}
                    icon={LinkIcon}
                    fullWidth
                />
            </div>
        </Modal>
    );
};
export default SettingsModal;

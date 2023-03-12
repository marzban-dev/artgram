import Avatar from "components/avatar";
import Input from "components/input";
import Modal from "components/modal";
import SelectMenu from "components/select-menu";
import Textarea from "components/textarea";
import LinkIcon from "public/assets/icon/link.svg";
import LocationIcon from "public/assets/icon/location-dot.svg";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import validator from "validator";
import Background from "./components/background";
import { countries } from "constants/countries";
import { ISettingsModalProps } from "./settings-modal.types";

const SettingsModal: React.FC<ISettingsModalProps> = ({ show, setShow, userData, sendUpdateRequest }) => {
    const [inputValues, setInputValues] = useState(userData);

    const [errors, setErrors] = useState<{ [x: string]: string }>({});
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            if (Object.keys(errors).length === 0) sendUpdateRequest(inputValues);
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

    const changeUserData = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        property: string
    ) => {
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
            }
        } else removeError(property);
    };
    
    return (
        <Modal title="Settings" show={show} onClose={() => setShow(false)}>
            <div className="flex flex-col items-center justify-start gap-5 max-[520px]:pb-8">
                <div className="relative mb-[45px] flex w-full items-center justify-center">
                    <Background background="https://artgram.iran.liara.run/media/header.jpg" />
                    <div className="absolute bottom-[-25%] z-[30]">
                        <Avatar
                            className="h-[100px] w-[100px] overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.15)]"
                            placeholderClassName="border border-[rgb(40,40,40)]"
                            picture="https://artgram.iran.liara.run/media/profile.jpg"
                            title="profile"
                            square
                        />
                    </div>
                </div>
                <div className="flex w-full items-center justify-center gap-5">
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
                <SelectMenu
                    items={Object.keys(countries).map((country) => ({ value: country, text: countries[country] }))}
                    onChange={(e) => changeUserData(e, "location")}
                    value={inputValues.location}
                    icon={LocationIcon}
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

export default memo(SettingsModal);

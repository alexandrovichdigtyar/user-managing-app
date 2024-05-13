import { useAddUser, useUpdateUser, useUser } from "@/queries/users";
import { AppRoutes, CreatingUser, UserData } from "@/types/types";
import { userSchema } from "@/utils/userValidationSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";

interface EditModalProps {
    itemId?: string;
}

const INITIAL_VALUES = {
    name: "",
    userName: "",
    email: "",
    city: ""
}

const EditModal = ({ itemId }: EditModalProps) => {
    const title = itemId ? "Edit" : "Add";

    const router = useRouter();

    const addUser = useAddUser();
    const updateUser = useUpdateUser();

    const { data } = useUser(itemId);

    const { formState: { errors }, handleSubmit, control, reset } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: INITIAL_VALUES,
    });

    const onCancel = () => router.push(AppRoutes.home);

    const onSubmit = async (values: CreatingUser | UserData) => {
        if (itemId) {
            await updateUser.mutateAsync({
                userId: itemId,
                updatedUser: values as UserData
            })
        } else {
            await addUser.mutateAsync(values)
        }
        onCancel();
    }

    useEffect(() => {
        reset(data);
    }, [data?.id])

    return (
        <Modal title={title} onClose={onCancel}>
            <ContentWrapper >
                <FormBody onSubmit={handleSubmit(onSubmit)}>
                    <Grid container mt={1} direction="column" gap={2}>
                        <Grid item xs={12}>
                            <Input
                                name={"name"}
                                label="Name"
                                control={control}
                                error={errors?.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name={"userName"}
                                label="User name"
                                control={control}
                                error={errors?.userName}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name={"email"}
                                label="Email"
                                control={control}
                                error={errors?.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                name={"city"}
                                label="City"
                                control={control}
                                error={errors?.city}
                            />
                        </Grid>

                        <Grid item container xs={12} justifyContent="space-between">
                            <Grid item xs={4} mt={2}>
                                <Button variant="contained" type="button" title="Cancel" onClick={onCancel} />
                            </Grid>
                            <Grid item xs={4} mt={2}>
                                <Button variant="contained" type="submit" title="Save" />
                            </Grid>
                        </Grid>
                    </Grid>
                </FormBody>
            </ContentWrapper>
        </Modal>
    )
}

const ContentWrapper = styled(Container)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const FormBody = styled("form")`
`

export default EditModal;
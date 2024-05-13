'use client'

import Button from "@/components/Button/Button"
import DataTable from "@/components/DataTable/DataTable"
import DeleteModal from "@/components/DeleteModal/DeleteModal"
import { useUsers } from "@/queries/users"
import { AppRoutes, UserData } from "@/types/types"
import { Container, Typography } from "@mui/material"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import styled from "styled-components"
import { deleteItemIdAtom, loadingAtom } from "../../state/store"

export default function Home() {
    const { data, isLoading } = useUsers();

    const [deleteItemId, setdDleteItemId] = useAtom(deleteItemIdAtom);
    const [_, setIsLoading] = useAtom(loadingAtom);

    const toggleDeleteModal = (id: string | null) => setdDleteItemId(() => id);

    const router = useRouter();

    const onAddUser = () => router.push(`${AppRoutes.add}`);

    const columns = [
        {
            field: "id",
            label: "ID",
            width: 50
        },
        {
            field: "userName",
            label: "Username",
            width: 100,
            sortable: true,
        },
        {
            field: "email",
            label: "Email",
            width: 200
        },
        {
            field: "name",
            label: "Name",
            width: 200
        },
        {
            field: "city",
            label: "City",
            width: 150
        },
    ]

    const actionColumns = [
        {
            label: "Edit",
            onClick: (id: string) => router.push(`${AppRoutes.edit}/${id}`),
        },
        {
            label: "Delete",
            onClick: (id: string) => toggleDeleteModal(id),
        }
    ]

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading])

    return (
        <ContainerWrapper>
            <Header>
                <Typography>
                    User List
                </Typography>
                <Button variant="contained" title="Add new" onClick={onAddUser} />
            </Header>
            {data && (
                <DataTable columns={columns} data={data} actionColumns={actionColumns} />
            )}
            {deleteItemId && (
                <DeleteModal userName={data.find((item: UserData) => item.id === deleteItemId)?.userName} />
            )}
        </ContainerWrapper>
    )
}

const Header = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`

const ContainerWrapper = styled(Container)`
`

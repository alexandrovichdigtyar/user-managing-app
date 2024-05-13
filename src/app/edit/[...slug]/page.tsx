'use client'

import EditModal from "@/components/EditModal/EditModal";

const Edit = ({ params }: { params: { slug: string } }) => (
    <EditModal itemId={params.slug} />
);

export default Edit;
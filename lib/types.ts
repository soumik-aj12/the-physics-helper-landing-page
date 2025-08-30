type DropdownItem = {
    label: string;
    link: string;
};
export type BreadcrumbProps = {
    start: string;
    end: string ;
    dropdownItems: DropdownItem[];
    startLink: string;
    endLink: string;
};

export type ContactProps = {
    mapLat: number;
    mapLng: number;
    address: string;
};
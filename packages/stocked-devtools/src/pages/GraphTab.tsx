import { useEffect, useState } from 'react';

import { GraphNode, GraphView, NodeType } from '../components/GraphView';
import { objectToGraph } from '../utils/objectToGraph';

import classes from './GraphTab.module.scss';

const rootNode: GraphNode = objectToGraph({
    inv_id: 2872.0,
    invoice_type: '',
    status: '',
    inv_no: '',
    supplier: {
        com_id: 0.0,
        com_name: '',
        com_type: '',
        reg_no: '',
        vat_no: '',
        reg_address: {
            loc_id: null,
            country_code: '',
            country_name: '',
            city: '',
            street: '',
            zip: '',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        mail_address: {
            loc_id: null,
            country_code: '',
            country_name: '',
            city: '',
            street: '',
            zip: '',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        contact_person: {
            cper_id: 2.0,
            contact_type: '',
            is_private: '',
            person_name_surname: '',
            phone: '',
            email: '',
            fax: '',
            notes: null,
            visibility: '',
            is_editable: '',
            position: '',
            usr_id: 1.0
        },
        bank_account: {
            bac_id: null,
            is_primary: null,
            is_active: null,
            bank_code: null,
            bank_name: null,
            iban: '',
            bank_swift: '',
            com_id: null,
            currency: null
        },
        notes: [],
        docs: [
            {
                document_id: 17193.0,
                document_type: '',
                document_date: '',
                file_mime_type: '',
                file_name: '',
                file_size: 93004.0,
                document_title: null,
                document_notes: null,
                is_public: '',
                temporary_id: null,
                visibility: '',
                mark_as_deleted: null,
                user_roles: [],
                valid_from: null,
                valid_to: null
            }
        ],
        duns_no: 3.60441033e8
    },
    customer: {
        com_id: 704.0,
        com_name: '',
        com_type: '',
        reg_no: '',
        vat_no: '',
        reg_address: {
            loc_id: null,
            country_code: '',
            country_name: '',
            city: '',
            street: '',
            zip: '',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        mail_address: {
            loc_id: null,
            country_code: '',
            country_name: '',
            city: '',
            street: '',
            zip: '',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        contact_person: {
            cper_id: 2998.0,
            contact_type: '',
            is_private: '',
            person_name_surname: '',
            phone: '',
            email: '',
            fax: '',
            notes: null,
            visibility: '',
            is_editable: '',
            position: '',
            usr_id: 1158.0
        },
        bank_account: {
            bac_id: null,
            is_primary: null,
            is_active: null,
            bank_code: null,
            bank_name: null,
            iban: null,
            bank_swift: null,
            com_id: null,
            currency: null
        },
        notes: [],
        docs: [],
        duns_no: null
    },
    issue_date: '',
    due_date: '',
    submit_date: '',
    receive_date: null,
    approve_date: null,
    approve_person_name: '',
    paid_date: null,
    payment_term: 40.0,
    vat_percent: 0.0,
    discount_percent: null,
    discount_amount: null,
    subtotal_amount: 0.0,
    credit_note_amount: 0.0,
    debit_note_amount: 0.0,
    taxes_amount: 0.0,
    total_amount: 0.0,
    currency: '',
    notify_late_payment: '',
    notify_email: null,
    notify_days_after: null,
    lines: [
        {
            record_status: '',
            inl_id: 2873.0,
            review_status: '',
            position: 1.0,
            service: null,
            trs_id: 13507.0,
            dmg_id: null,
            load_date: '',
            unload_date: '',
            ctr_id: 5672.0,
            truck_no: '',
            loc_from: '',
            loc_to: '',
            ord_id: 4625.0,
            ord_no: '',
            ord_type: '',
            currency: '',
            subtotal_amount: 0.0,
            total_amount: 0.0,
            vat_percent: 0.0,
            unit_code: '',
            unit_name: '',
            unit_price: 0.0,
            qnty: 3.0,
            load_factor: 3.0,
            supplier_notes: [],
            customer_notes: [],
            cmr_no: '',
            has_errors: '',
            errors: [],
            models: []
        }
    ],
    cancel_info: { cancel_date: null, reason: null, notes: null, person_name: null },
    parent_invoice: { inv_id: null, inv_no: null, inv_type: null, issue_date: null, inv_status: null },
    children: []
});

rootNode.type = NodeType.HIGHLIGHT;
rootNode.childNodes[4].type = NodeType.HIGHLIGHT;
rootNode.childNodes[4].childNodes[5].type = NodeType.ORIGIN;
rootNode.childNodes[4].childNodes[5].childNodes[0].type = NodeType.HIGHLIGHT;

export const GraphTab = () => {
    const [msg, setMsg] = useState();

    useEffect(() => {
        window.addEventListener('message', (event) => {
            setMsg(event.data);
        });
    }, []);

    return (
        <div className={classes['tab']}>
            <GraphView rootNode={rootNode} />
            {JSON.stringify(msg)}
        </div>
    );
};

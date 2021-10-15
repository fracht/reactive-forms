import { GraphNode, GraphView, NodeType } from '../components/GraphView';
import { objectToGraph } from '../utils/objectToGraph';

import classes from './GraphTab.module.scss';

const rootNode: GraphNode = objectToGraph({
    inv_id: 2872.0,
    invoice_type: 'INV',
    status: 'SUB',
    inv_no: '8334',
    supplier: {
        com_id: 0.0,
        com_name: 'SIA Fracht',
        com_type: 'SYS',
        reg_no: '40103253277',
        vat_no: 'LV40103253277',
        reg_address: {
            loc_id: null,
            country_code: 'LV',
            country_name: 'Latvia',
            city: 'Riga',
            street: 'Pulkveza Brieza iela 8-1',
            zip: 'LV-1010',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        mail_address: {
            loc_id: null,
            country_code: 'LV',
            country_name: 'Latvia',
            city: 'Riga',
            street: 'Pulkveza Brieza iela 35-3',
            zip: 'LV-1045',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        contact_person: {
            cper_id: 2.0,
            contact_type: 'CRGD',
            is_private: 'N',
            person_name_surname: 'Renatas Slenderis',
            phone: '+37129129233',
            email: 'renatas.slenderis@fracht.lv',
            fax: '+37167322370',
            notes: null,
            visibility: 'PUB',
            is_editable: 'Y',
            position: 'Member of the board',
            usr_id: 1.0
        },
        bank_account: {
            bac_id: null,
            is_primary: null,
            is_active: null,
            bank_code: null,
            bank_name: null,
            iban: 'LV39RIKO0002930100034',
            bank_swift: 'RIKOLV2X',
            com_id: null,
            currency: null
        },
        notes: [],
        docs: [
            {
                document_id: 17193.0,
                document_type: 'INVS',
                document_date: '2021-10-12T11:51:18.000+0000',
                file_mime_type: 'application/pdf',
                file_name: 'CMR files.pdf',
                file_size: 93004.0,
                document_title: null,
                document_notes: null,
                is_public: 'N',
                temporary_id: null,
                visibility: 'PRI',
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
        com_name: 'Volkswagen Konzernlogistik GmbH & Co',
        com_type: 'MF',
        reg_no: '*704',
        vat_no: 'DE115235745',
        reg_address: {
            loc_id: null,
            country_code: 'DE',
            country_name: 'Germany',
            city: 'Wolfsburg',
            street: 'Brieffach 6902',
            zip: 'D-38436',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        mail_address: {
            loc_id: null,
            country_code: 'DE',
            country_name: 'Germany',
            city: 'Wolfsburg',
            street: 'Brieffach 6902',
            zip: 'D-38436',
            longitude: null,
            latitude: null,
            place_type: null,
            zip_region: null
        },
        contact_person: {
            cper_id: 2998.0,
            contact_type: 'CUST.CON',
            is_private: 'Y',
            person_name_surname: 'Herr Oliver Schulz',
            phone: '+4953612631472',
            email: 'oliver.schulz1@volkswagen.de',
            fax: '+49536195651472',
            notes: null,
            visibility: 'PRI',
            is_editable: 'Y',
            position: 'Executive',
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
    issue_date: '2021-10-12T11:50:53.000+0000',
    due_date: '2021-11-20T22:00:00.000+0000',
    submit_date: '2021-10-12T11:51:09.000+0000',
    receive_date: null,
    approve_date: null,
    approve_person_name: ' ',
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
    currency: 'EUR',
    notify_late_payment: 'N',
    notify_email: null,
    notify_days_after: null,
    lines: [
        {
            record_status: 'QRY',
            inl_id: 2873.0,
            review_status: 'NEW',
            position: 1.0,
            service: null,
            trs_id: 13507.0,
            dmg_id: null,
            load_date: '2015-05-22T17:22:00.000+0000',
            unload_date: '2015-05-23T08:31:00.000+0000',
            ctr_id: 5672.0,
            truck_no: 'HFH644/WK568',
            loc_from: 'DE, Hannover',
            loc_to: 'NL, Leusden',
            ord_id: 4625.0,
            ord_no: '30-004726-03',
            ord_type: 'CON',
            currency: 'EUR',
            subtotal_amount: 0.0,
            total_amount: 0.0,
            vat_percent: 0.0,
            unit_code: 'VEH',
            unit_name: 'veh.',
            unit_price: 0.0,
            qnty: 3.0,
            load_factor: 3.0,
            supplier_notes: [],
            customer_notes: [],
            cmr_no: '5454',
            has_errors: 'N',
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
    return (
        <div className={classes['tab']}>
            <GraphView rootNode={rootNode} />
        </div>
    );
};

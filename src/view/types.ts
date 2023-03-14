type Union = 'attributes' |
    'classList' |
    'clientHeight' |
    'clientLeft' |
    'clientTop' |
    'clientWidth' |
    'localName' |
    'namespaceURI' |
    'ownerDocument' |
    'part' |
    'prefix' |
    'scrollHeight' |
    'scrollWidth' |
    'shadowRoot' |
    'tagName' | 'baseURI' |
    'childNodes' |
    'firstChild' |
    'isConnected' |
    'lastChild' |
    'nextSibling' |
    'nodeName' |
    'nodeType' |
    'ownerDocument' |
    'parentElement' |
    'parentNode' |
    'previousSibling' |
    'nextElementSibling' |
    'previousElementSibling' |
    'childElementCount' |
    'children' |
    'firstElementChild' |
    'lastElementChild' |
    'ATTRIBUTE_NODE' |
    'CDATA_SECTION_NODE' |
    'COMMENT_NODE' |
    'DOCUMENT_FRAGMENT_NODE' |
    'DOCUMENT_NODE' |
    'DOCUMENT_POSITION_CONTAINED_BY' |
    'DOCUMENT_POSITION_CONTAINS' |
    'DOCUMENT_POSITION_DISCONNECTED' |
    'DOCUMENT_POSITION_FOLLOWING' |
    'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC' |
    'DOCUMENT_POSITION_PRECEDING' |
    'DOCUMENT_TYPE_NODE' |
    'ELEMENT_NODE' |
    'ENTITY_NODE' |
    'ENTITY_REFERENCE_NODE' |
    'NOTATION_NODE' |
    'PROCESSING_INSTRUCTION_NODE' |
    'TEXT_NODE' |
    'assignedSlot';

// type Attributes = Omit<Element, Union>;

export type Attributes = {
    [key: string]: string;
} | {
    id?: string;
}
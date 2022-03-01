const PAGINATE_GQL = `
  paginate {
    totalDocs
    limit
    totalPages
    page
    pagingCounter
    hasPrevPage
    hasNextPage
    prevPage
    nextPage
  }
`;

export const AUTH_USER_STR = `mutation authenticateToken($input:AuthenticateInput!){
  authenticateToken(input:$input){token}
}`;

export const AUTH_REVALIDATE_STR = `mutation revalidateToken{revalidateToken{token}}`;

export const AUTH_USER = `
  ${AUTH_USER_STR}
`;

export const AUTH_REVALIDATE = `
  ${AUTH_REVALIDATE_STR}
`;

const STR_DISPLAY_USUARIO = `{
  id
  name
  email
}`;

export const OBTENER_USUARIO = `
  query getUser {
    getUser
      ${STR_DISPLAY_USUARIO}
  }
`;

export const OBTENER_USUARIOS = `
  query getUsers {
    getUsers
      ${STR_DISPLAY_USUARIO}
  }
`;

export const NUEVO_USUARIO = `
  mutation newUser($input: UserInput!) {
    newUser(input: $input)
      ${STR_DISPLAY_USUARIO}
  }
`;

const STR_DISPLAY_CONDOMINIO = `{
  id
  name
  dni
  email
  phone
  address
  contactName
  active
  propertiesCount
  coinTypeId
  coinType{
    coinTypeName
  }
  
}`;

const STR_DISPLAY_COINTYPES = `{
  id
  coinTypeName
  symbol
  active
}`;

export const OBTENER_CONDOMINIOS = `
  query getCondominios {
    getCondominios 
      ${STR_DISPLAY_CONDOMINIO}
  }
`;

export const OBTENER_UNCONDOMINIO = `
  query getCondominio($id:ID!) {
    getCondominio(id:$id)
      ${STR_DISPLAY_CONDOMINIO}
  }
`;

export const OBTENER_UNCONDOMINIO_COINTYPE = `
  query getCondominioCoinType($id: ID!,$condid: ID!,$active:Boolean) {
    getCondominio(id: $id) 
      ${STR_DISPLAY_CONDOMINIO}
    
    getCoinTypes(condid: $condid, active: $active)
      ${STR_DISPLAY_COINTYPES}
  }
`;

export const NUEVO_CONDOMINIO = `
  mutation newCondominio($input: CondominioInput!) {
    newCondominio(input: $input) 
      ${STR_DISPLAY_CONDOMINIO}
  }
`;

export const ACTUALIZAR_CONDOMINIO = `
  mutation updateCondominio($id: ID!, $input: CondominioInput!) {
    updateCondominio(id: $id, input: $input) 
      ${STR_DISPLAY_CONDOMINIO}
  }
`;

export const ACTUALIZAR_CONDOMINIO_ACTIVE = `
  mutation updateCondominioActive($id: ID!, $active: Boolean) {
    updateCondominioActive(id: $id, active: $active)
      ${STR_DISPLAY_CONDOMINIO}
  }
`;

export const ELIMINAR_CONDOMINIO = `
  mutation removeCondominio($id: ID!) {
    removeCondominio(id: $id)
    ${STR_DISPLAY_CONDOMINIO}
  }
`;

export const OBTENER_COINTYPES = `
  query getCoinTypes($condid: ID!, $active: Boolean) {
    getCoinTypes(condid: $condid, active: $active) 
      ${STR_DISPLAY_COINTYPES}
  }
`;

export const OBTENER_UNCOINTYPE = `
  query getCoinType($id: ID!) {
    getCoinType(id: $id) 
      ${STR_DISPLAY_COINTYPES}
  }
`;

export const NUEVO_COINTYPE = `
  mutation newCoinType($input: CoinTypeInput!) {
    newCoinType(input: $input)
      ${STR_DISPLAY_COINTYPES} 
  }
`;

export const ACTUALIZAR_COINTYPE = `
  mutation updateCoinType($id: ID!, $input: CoinTypeInput!) {
    updateCoinType(id: $id, input: $input) 
      ${STR_DISPLAY_COINTYPES}
  }
`;

export const ELIMINAR_COINTYPE = `
  mutation removeCoinType($id: ID!) {
    removeCoinType(id: $id) 
      ${STR_DISPLAY_COINTYPES}
  }
`;

const STR_DISPLAY_PROPERTYTYPE = `{
  id
  propertyTypeName
  active
}`;

export const OBTENER_PROPERTYTYPES = `
  query getPropertyTypes($condid: ID!, $active: Boolean) {
    getPropertyTypes(condid: $condid, active: $active)
      ${STR_DISPLAY_PROPERTYTYPE} 
  }
`;

export const OBTENER_UNPROPERTYTYPES = `
  query getPropertyType($id: ID!) {
    getPropertyType(id: $id)
      ${STR_DISPLAY_PROPERTYTYPE}
  }
`;

export const NUEVO_PROPERTYTYPE = `
  mutation newPropertyType($input: PropertyTypeInput!) {
    newPropertyType(input: $input)
      ${STR_DISPLAY_PROPERTYTYPE}
  }
`;

export const ACTUALIZAR_PROPERTYTYPE = `
  mutation updatePropertyType($id: ID!, $input: PropertyTypeInput!) {
    updatePropertyType(id: $id, input: $input)
      ${STR_DISPLAY_PROPERTYTYPE} 
  }
`;

export const ELIMINAR_PROPERTYTYPE = `
  mutation removePropertyType($id: ID!) {
    removePropertyType(id: $id)
      ${STR_DISPLAY_PROPERTYTYPE}  
  }
`;

const STR_DISPLAY_PROPERTY = `{
    id
    condominioId
    propertyName
    propertyFullName
    propertyTypeId
    aliquot
    owner {
      ownerName
      dni
      email
      phone
    }
}`;

export const OBTENER_PAGE_PROPERTIES = `
  query getPropertiesPaginate(
    $condid: ID!
    $page: Int!
    $limit: Int!
  ) {
    getPropertiesPaginate(
      condid: $condid
      page: $page
      limit: $limit
    ) {
      docs 
      ${STR_DISPLAY_PROPERTY}
      ${PAGINATE_GQL}     
    }
  }
`;

export const OBTENER_PROPERTIES = `
  query getProperties($condid: ID!) {
    getProperties(condid: $condid) 
      ${STR_DISPLAY_PROPERTY}
  }
`;

export const OBTENER_UNPROPERTY = `
  query getProperty($id: ID!) {
    getProperty(id: $id)
      ${STR_DISPLAY_PROPERTY}
  }
`;

export const OBTENER_UNPROPERTY_OWNER_TYPE = `
  query getProperty($id: ID!, $condid: ID!, $active: Boolean) {
    getProperty(id: $id) {
      id
      condominioId
      propertyName
      propertyFullName
      propertyTypeId
      aliquot
      ownerId
    }
    getPropertyTypes(condid: $condid, active: $active) {
      id
      propertyTypeName
    }
    getOwners(condid: $condid) {
      id
      ownerName
      dni
      email
      phone
    }
  }
`;

export const OBTENER_OWNER_TYPE = `
  query getProperty( $condid: ID!, $active: Boolean) {
    getPropertyTypes(condid: $condid, active: $active) {
      id
      propertyTypeName
    }
    getOwners(condid: $condid) {
      id
      ownerName
      dni
      email
      phone
      comment
    }
  }
`;

export const NUEVO_PROPERTY = `
  mutation newProperty($input: PropertyInput!) {
    newProperty(input: $input)
      ${STR_DISPLAY_PROPERTY}
  }
`;

export const ACTUALIZAR_PROPERTY = `
  mutation updateProperty($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input)
      ${STR_DISPLAY_PROPERTY}
  }
`;

export const ELIMINAR_PROPERTY = `
  mutation removeProperty($id: ID!) {
    removeProperty(id: $id)
      ${STR_DISPLAY_PROPERTY}
  }
`;

const STR_DISPLAY_OWNER = `{
    id
    ownerName
    dni
    phone
    email
    comment
    propertiesCount
  }`;

export const OBTENER_PAGE_OWNERS = `
  query getOwnersPaginate(
    $condid: ID!
    $page: Int!
    $limit: Int!
    $sortName: String
    $sortASC: Int
  ) {
    getOwnersPaginate(
      condid: $condid
      page: $page
      limit: $limit
      sortName: $sortName
      sortASC: $sortASC
    ) {
      docs 
      ${STR_DISPLAY_OWNER}
      ${PAGINATE_GQL}     
    }
  }
`;

export const OBTENER_OWNER = `
query getOwners($condid: ID!) {
    getOwners(condid: $condid) 
      ${STR_DISPLAY_OWNER}
  }
`;

export const OBTENER_UNOWNER = `
  query getOwner($id: ID!) {
    getOwner(id: $id) {
      id
      ownerName
      dni
      phone
      email
      comment
      propertiesCount
      properties {
        id
        propertyName
        propertyFullName
        aliquot
      }
    }
  }
`;

export const NUEVO_OWNER = `
  mutation newOwner($input: OwnerInput!) {
    newOwner(input: $input) 
      ${STR_DISPLAY_OWNER}
  }
`;

export const ACTUALIZAR_OWNER = `
  mutation updateOwner($id: ID!, $input: OwnerInput!) {
    updateOwner(id: $id, input: $input) 
      ${STR_DISPLAY_OWNER}
  }
`;

export const ELIMINAR_OWNER = `
  mutation removeOwner($id: ID!) {
    removeOwner(id: $id) 
      ${STR_DISPLAY_OWNER}
  }
`;

const STR_DISPLAY_SUPPLIER = `{
  id
  supplierName
  supplierDni
  supplierPhone
  supplierEmail
  supplierAddress
  supplierComment
}`;

export const OBTENER_PAGE_SUPPLIERS = `
query getSuppliersPaginate(
  $condid: ID!
  $page: Int!
  $limit: Int!
) {
  getSuppliersPaginate(
    condid: $condid
    page: $page
    limit: $limit
  ) {
    docs {
      id
      supplierName
      supplierDni
      supplierPhone
      supplierEmail
    }
    ${PAGINATE_GQL}     
  }
}
`;

export const OBTENER_SUPPLIER = `
query getSuppliers($condid: ID!) {
  getSuppliers(condid: $condid) 
    ${STR_DISPLAY_SUPPLIER}
}
`;

export const OBTENER_UNSUPPLIER = `
query getSupplier($id: ID!) {
  getSupplier(id: $id) {
    id
    supplierName
    supplierDni
    supplierPhone
    supplierEmail
    supplierAddress
    supplierComment
  }
}
`;

export const NUEVO_SUPPLIER = `
mutation newSupplier($input: SupplierInput!) {
  newSupplier(input: $input) 
    ${STR_DISPLAY_SUPPLIER}
}
`;

export const ACTUALIZAR_SUPPLIER = `
mutation updateSupplier($id: ID!, $input: SupplierInput!) {
  updateSupplier(id: $id, input: $input) 
    ${STR_DISPLAY_SUPPLIER}
}
`;

export const ELIMINAR_SUPPLIER = `
mutation removeSupplier($id: ID!) {
  removeSupplier(id: $id) 
    ${STR_DISPLAY_SUPPLIER}
}
`;

export const ACTUALIZAR_USUARIO = `
  mutation UpdateUserMutation($updateUserInput: UserUpdateInput!) {
    updateUser(input: $updateUserInput) {
      id
      name
      email
    }
  }
`;

export const ELIMINAR_USUARIO = `
  mutation RemoveUserMutation {
    removeUser
  }
`;

const STR_DISPLAY_CONCEPTEXPENSEGROUP = `{
  id
  conceptNameGrp
  active
  condominioId
}`;

export const OBTENER_CONCEPTEXPENSEGROUP = `
  query getConceptExpenseGrps($condid: ID!,$active:Boolean) {
    getConceptExpenseGrps(condid: $condid,active:$active)
    ${STR_DISPLAY_CONCEPTEXPENSEGROUP}
  }
`;

export const OBTENER_UNCONCEPTEXPENSEGROUP = `
  query getConceptExpenseGrp($id: ID!) {
    getConceptExpenseGrp(id: $id) {
      id
      condominioId
      conceptNameGrp
      active
      conceptExpenses {
        conceptName
      }
    }
  }
`;

export const NUEVO_CONCEPTEXPENSEGROUP = `
  mutation newConceptExpenseGrp($input: ConceptExpenseGrpInput!) {
    newConceptExpenseGrp(input: $input) 
    ${STR_DISPLAY_CONCEPTEXPENSEGROUP}
  }
`;

export const ACTUALIZAR_CONCEPTEXPENSEGROUP = `
  mutation updateConceptExpenseGrp($id: ID!, $input: ConceptExpenseGrpInput!) {
    updateConceptExpenseGrp(id: $id, input: $input)
    ${STR_DISPLAY_CONCEPTEXPENSEGROUP} 
  }
`;

export const ELIMINAR_CONCEPTEXPENSEGROUP = `
  mutation removeConceptExpenseGrp($id: ID!) {
    removeConceptExpenseGrp(id: $id)
    ${STR_DISPLAY_CONCEPTEXPENSEGROUP} 
  }
`;

const STR_DISPLAY_CONCEPTEXPENSE = `{
  id
  condominioId
  conceptName
  forecastExpense
  calculateType
  permanent
  conceptGroupId
  conceptGroup {
    conceptNameGrp
  }
}`;

export const OBTENER_PAGE_CONCEPTEXPENSE = `
  query getConceptExpensesPaginate(
    $condid: ID!
    $page: Int!
    $limit: Int!
  ) {
    getConceptExpensesPaginate(
      condid: $condid
      page: $page
      limit: $limit
    ) {
      docs 
      ${STR_DISPLAY_CONCEPTEXPENSE}
      ${PAGINATE_GQL}     
    }
  }
`;

export const OBTENER_UNCONCEPTEXPENSE_CONCEPTGROUP = `
  query getConceptExpense($id: ID!, $condid: ID!, $active: Boolean) {
    getConceptExpense(id: $id) {
      id
      condominioId
      conceptName
      forecastExpense
      calculateType
      permanent
      conceptGroupId
    }
    getConceptExpenseGrps(condid: $condid, active: $active) {
      id
      conceptNameGrp
    }
  }
`;

export const OBTENER_UNCONCEPTEXPENSE = `
  query getConceptExpense($id: ID!) {
    getConceptExpense(id: $id) 
      ${STR_DISPLAY_CONCEPTEXPENSE}
  }
`;

export const OBTENER_CONCEPTEXPENSE = `
  query getConceptExpense($condid: ID!) {
    getConceptExpense(condid: $condid) 
      ${STR_DISPLAY_CONCEPTEXPENSE}
  }
`;

export const NUEVO_CONCEPTEXPENSE = `
  mutation newConceptExpense($input: ConceptExpenseInput!) {
    newConceptExpense(input: $input)
      ${STR_DISPLAY_CONCEPTEXPENSE}
  }
`;

export const ACTUALIZAR_CONCEPTEXPENSE = `
  mutation updateConceptExpense($id: ID!, $input: ConceptExpenseInput!) {
    updateConceptExpense(id: $id, input: $input)
      ${STR_DISPLAY_CONCEPTEXPENSE}
  }
`;

export const ELIMINAR_CONCEPTEXPENSE = `
  mutation removeConceptExpense($id: ID!) {
    removeConceptExpense(id: $id)
      ${STR_DISPLAY_CONCEPTEXPENSE}
  }
`;

const STR_DISPLAY_EXPENSE = `{
  id
  expenseName
  expenseDate
  expenseStatus
  expenseAmount
}`;

export const OBTENER_PAGE_EXPENSES = `
query getExpensesPaginate(
  $condid: ID!
  $page: Int!
  $limit: Int!
) {
  getExpensesPaginate(
    condid: $condid
    page: $page
    limit: $limit
  ) {
    docs 
    ${STR_DISPLAY_EXPENSE}
    ${PAGINATE_GQL}     
  }
}
`;

export const OBTENER_EXPENSES = `
query getExpenses($condid: ID!) {
  getExpenses(condid: $condid) 
    ${STR_DISPLAY_EXPENSE}
}
`;

export const OBTENER_UNEXPENSE = `
query getExpense($id: ID!, $condid: ID!) {
  getExpense(id: $id) {
    id
    expenseName
    expenseDate
    expenseStatus
    condominioId
    details {
      isForecast
      amount
      supplierId
      conceptExpenseId
      description
      calculateType
      propertiesId
      transactionDate
      transactionDoc
    }
  }
  getConceptExpenses(condid: $condid) {
    id
    conceptName
    forecastExpense
    calculateType
    permanent
  }
}
`;

export const NUEVO_EXPENSE = `
mutation newExpense($input: ExpenseInput!) {
  newExpense(input: $input) 
    ${STR_DISPLAY_EXPENSE}
}
`;

export const ACTUALIZAR_EXPENSE = `
mutation updateExpense($id: ID!, $input: ExpenseInput!) {
  updateExpense(id: $id, input: $input) 
    ${STR_DISPLAY_EXPENSE}
}
`;

export const ELIMINAR_EXPENSE = `
mutation removeExpense($id: ID!) {
  removeExpense(id: $id) 
    ${STR_DISPLAY_EXPENSE}
}
`;

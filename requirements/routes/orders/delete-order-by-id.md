# Deletar pedido

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api/orders/:id**
2. ✅ Valida dados obrigatórios **id**
3. ✅ **Deleta** o pedido de mesmo id fornecido na rota
4. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se o **id** for inválido
3. ✅ Retorna erro **500** se der erro ao tentar deletar o pedido
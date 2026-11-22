//Importacoes/ Bibliotecas / Frameworks

import { test, expect } from '@playwright/test';

//Função ou método
test('Fluxo de Reserva - Cenario positivo', async ({ page }) => {
  
  //Abre o endereço na URL
  await page.goto('https://www.blazedemo.com/');
  
  //Seleciona o menu de origem como São Paolo
  await page.locator('select[name="fromPort"]').selectOption('São Paolo');
  
  //Seleciona o menu de destino como London
  await page.locator('select[name="toPort"]').selectOption('London');
  
  //Clicar no botão Find Flights
  //await page.locator('BigInt.btn-primary').click();  - EXEMPLO DE ALTERNATIVA PARA CLICAR NO BOTÃO
  await page.getByRole('button', { name: 'Find Flights' }).click();
  
  //Mudar de página
  //Verificação do texto esperado
  await expect(page.getByRole('heading')).toContainText('Flights from São Paolo to London:');
 
  //Quando ele fala ROW ele diz que é para olhar uma tabela, então na tela ele faz a leitura de toda a linha 
  //Selecione um vôo
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
 
  //Muda de página 
  //Preenchimento de campos do formulário
  await page.getByRole('textbox', { name: 'Name', exact: true }).click(); //Clica no campo nome 
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Tadeus'); //Preenche o nome
  await page.locator('#cardType').selectOption('amex'); //Seleciona a bandeira do cartão
  await page.getByRole('checkbox', { name: 'Remember me' }).check(); //Seleciona o check box
  await page.getByRole('button', { name: 'Purchase Flight' }).click(); //Clica no botão "Purchase Flight"
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!'); //Verifica se na parte superior da tabela possui o texto predefinido
  await expect(page.locator('tbody')).toContainText('555 USD');//Verifica o preço (de forma grosseira)
});
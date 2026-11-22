//Bibliotecas
import { test, expect } from '@playwright/test';

//Funções ou Métodos
test('Fluxo de reserva - script simples', async ({ page }) => {
    //Abre o navegador
    await page.goto('https://www.blazedemo.com');
    // Selecione a cidade de origem de destino do voo, e clica no botão Find Flights
    await page.locator('select[name="fromPort"]').selectOption('São Paolo');
    await page.locator('select[name="toPort"]').selectOption('London');
    await page.locator('input.btn.btn-primary').click();

    //Transição de página 
    //Verificar se estamos na página correta baseado em um texto âncora
    await expect (page.locator('h3')).toHaveText('Flights from São Paolo to London:');
    //Selecionar o voo desejado
    //await page.locator('btn.btn-small').click() //Clicar no primeiro botão 
    await page.getByRole('row', {name: 'Choose This Flight 234 United Airlines'}).getByRole('button').click();
    
    //Transição de página
    //Verificar se estamos na página certa baseada em parte da URL
    await expect (page).toHaveURL(/purchase\.php/);
    //Preencher a caixa de texto cujo ID é inputName com o texto Tadeus
    await page.locator('#inputName').fill('Tadeus'); //Quando usa o # indica que o seletor é um ID
    //Selecionar bandeira como Ams
    await page.locator('#cardType').selectOption('amex');
    //Marcar o check box Remember me
    await page.locator('#rememberMe').check();
    //Clicar no botão 
    await page.locator('input.btn.btn-primary').click();

    //Transição de página 
    //Verificar se estamos na página certa baseada em parte da URL
    await expect (page).toHaveURL(/confirmation\.php/);
    //Verificar a mensagem de agradecimento e o preço
    await expect(page.locator('h1').toHaveText,('Thank you for your purchase today!'));
    await expect(page.getByRole('row', { name: 'Amount 555 USD'})).toBeVisible();


    /*Ordem de prioridade de como selecionar o elemento no site
    1. Datatest
    2. ID
    3. Datatest
    4. Selector
    5. Classe
    */
    


    
})
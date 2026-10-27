export class MobileAppAPI {


    public static getDownLoadLink = (userAgent: string) => {
        return cy.request({
            url: 'https://mbio.go.link/6OW91',
            failOnStatusCode: false,
            followRedirect: false,
            headers: {'user-agent': userAgent}
        });
    }

}
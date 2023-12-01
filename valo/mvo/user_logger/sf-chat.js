/**
 * @param {'fr' | 'en'} lang
 * @param {{firstName: string, lastName: string, email: string}} user -
 * @param {string} origin
 * @param {'Valobat.fr' | 'MVA' | 'MVO'} webOrigin
 * @param {boolean} displayHelpButton
 * @example initChat('fr',{firstName: 'John', lastName: 'Doe', email: 'john@doe.com'} , 'Chat en ligne', 'MVO');
 */
export function initChat(
  lang,
  user,
  origin,
  webOrigin,
  displayHelpButton = true
) {
  const gslbBaseURL = window.embedded_svc ? "https://service.force.com" : null;

  embedded_svc.settings.displayHelpButton = displayHelpButton; //Or false
  embedded_svc.settings.language = lang; //For example, enter 'en' or 'en-US'

  embedded_svc.settings.defaultMinimizedText =
    lang === "fr" ? "Besoin d'aide ?" : "Need help ?"; //(Defaults to Chat with an Expert)
  embedded_svc.settings.offlineSupportMinimizedText =
    lang === "fr" ? "Contactez-nous" : "Contact-Us"; //(Defaults to Agent Offline)

  embedded_svc.settings.extraPrechatInfo = [
    {
      entityName: "Contact",
      showOnCreate: true,
      linkToEntityName: "Case",
      linkToEntityField: "ContactId",
      saveToTranscript: "Contact",
      entityFieldMaps: [
        {
          isExactMatch: true,
          fieldName: "FirstName",
          doCreate: false,
          doFind: true,
          label: "FirstName",
        },
        {
          isExactMatch: true,
          fieldName: "LastName",
          doCreate: false,
          doFind: true,
          label: "LastName",
        },
        {
          isExactMatch: true,
          fieldName: "Email",
          doCreate: false,
          doFind: true,
          label: "Email",
        },
      ],
    },
    {
      entityName: "Case",
      showOnCreate: true,
      saveToTranscript: "Case",
      entityFieldMaps: [
        {
          isExactMatch: false,
          fieldName: "Status",
          doCreate: true,
          doFind: false,
          label: "Status",
        },
        {
          isExactMatch: false,
          fieldName: "Origin",
          doCreate: true,
          doFind: false,
          label: "Origin",
        },
        {
          isExactMatch: false,
          fieldName: "Web_Origin__c",
          doCreate: true,
          doFind: false,
          label: "Web Origin",
        },
      ],
    },
    {
      entityName: "Account",
      showOnCreate: true,
      linkToEntityName: "Case", // check
      linkToEntityField: "AccountId", // check
      saveToTranscript: "Account", // check
      entityFieldMaps: [
        {
          isExactMatch: true,
          fieldName: "Name",
          doCreate: false,
          doFind: true,
          label: "LastName",
        },
      ],
    },
  ];

  embedded_svc.settings.extraPrechatFormDetails = [
    {
      label: "FirstName",
      value: user.firstName,
      transcriptFields: [],
      displayToAgent: true,
    },
    {
      label: "LastName",
      value: user.lastName,
      transcriptFields: [],
      displayToAgent: false,
    },
    {
      label: "Email",
      value: user.email,
      transcriptFields: [],
      displayToAgent: true,
    },
    {
      label: "Langage",
      value: lang,
      transcriptFields: ["Langage__c"],
      displayToAgent: true,
    },
    {
      label: "Origin",
      value: origin,
      transcriptFields: [],
      displayToAgent: true,
    },
    {
      label: "Web Origin",
      value: webOrigin,
      transcriptFields: [],
      displayToAgent: true,
    },
  ];

  embedded_svc.settings.enabledFeatures = ["LiveAgent"];
  embedded_svc.settings.entryFeature = "LiveAgent";

  embedded_svc.init(
    "https://valobat--chatbot.sandbox.my.salesforce.com",
    "https://valobat--chatbot.sandbox.my.site.com/callcenter",
    gslbBaseURL,
    "00DAW000001Jllp",
    "Chat_MVO",
    {
      baseLiveAgentContentURL:
        "https://c.la2s-core1.sfdc-urlt2q.salesforceliveagent.com/content",
      deploymentId: "572AW000000xmBt",
      buttonId: "573AW000000ECsX",
      baseLiveAgentURL:
        "https://d.la2s-core1.sfdc-urlt2q.salesforceliveagent.com/chat",
      eswLiveAgentDevName:
        "EmbeddedServiceLiveAgent_Parent04IAW0000002COT2A2_18c24af5e67",
      isOfflineSupportEnabled: false,
    }
  );
}

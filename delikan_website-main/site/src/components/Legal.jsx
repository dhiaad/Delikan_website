import { CABINET, LEGAL } from '../data'
import { linkProps } from '../router'
import Todo from './Todo'

const Block = ({ title, children }) => (
  <div className="legal__block">
    <h2 className="legal__title">{title}</h2>
    <div className="legal__body">{children}</div>
  </div>
)

// Mentions légales : LCEN (loi n° 2004-575, art. 6) et informations propres à une profession de santé réglementée.
export function Mentions() {
  return (
    <section className="section legal" id="mentions">
      <div className="container legal__wrap">
        <Block title="Éditeur du site">
          <p>
            {LEGAL.editeur}
            <br />
            {CABINET.street}, {CABINET.city}
            <br />
            Téléphone : <a href={CABINET.phoneHref}>{CABINET.phone}</a>
            <br />
            E-mail : <Todo value={LEGAL.email}>adresse e-mail du cabinet</Todo>
            <br />
            SIRET : <Todo value={LEGAL.siret}>numéro SIRET</Todo>
            {LEGAL.structure && (
              <>
                <br />
                Forme d’exercice : {LEGAL.structure}
              </>
            )}
          </p>
        </Block>

        <Block title="Profession réglementée">
          <p>
            Titre professionnel : chirurgien-dentiste (France).
            <br />
            Diplôme : <Todo value={LEGAL.diplome}>diplôme d’État, université et année d’obtention</Todo>
            <br />
            Numéro RPPS : {CABINET.rpps} (
            <a href={CABINET.annuaire} target="_blank" rel="noreferrer">
              vérifier sur santé.fr
            </a>
            )
            <br />
            Inscription : {LEGAL.ordre}.
            <br />
            Règles professionnelles : code de déontologie des chirurgiens-dentistes, articles R.4127-201 et suivants du
            Code de la santé publique (
            <a
              href="https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006196413/"
              target="_blank"
              rel="noreferrer"
            >
              Légifrance
            </a>
            ).
            <br />
            Conventionnement : {LEGAL.convention} Organisme : Assurance Maladie.
          </p>
          <p className="muted">
            Le Dr Delikan exerce l’omnipratique. L’implantologie, l’odontologie chirurgicale et la parodontologie sont des
            orientations de sa pratique : elles ne constituent pas des spécialités au sens du Code de la santé publique.
            Les diplômes universitaires (D.U.) et le certificat d’études supérieures (C.E.S.) mentionnés sur ce site ne
            sont pas des spécialités.
          </p>
        </Block>

        <Block title="Directeur de la publication">
          <p>{LEGAL.directeur}</p>
        </Block>

        <Block title="Hébergement">
          <p>
            <Todo value={LEGAL.hebergeur}>nom, adresse et téléphone de l’hébergeur</Todo>
          </p>
        </Block>

        <Block title="Contenus et propriété intellectuelle">
          <p>
            Les textes, le logo et les éléments graphiques de ce site sont la propriété du cabinet. Toute reproduction
            sans autorisation est interdite. {LEGAL.conception} Les polices utilisées (Bodoni Moda, Montserrat) sont
            distribuées sous licence libre SIL Open Font License.
          </p>
          <p>
            Les informations de ce site sont données à titre général et ne remplacent pas une consultation. Elles ne
            constituent ni un diagnostic ni une prescription.
          </p>
        </Block>

        <Block title="Données personnelles">
          <p>
            Voir la <a {...linkProps('confidentialite')}>politique de confidentialité et cookies</a>.
          </p>
        </Block>
      </div>
    </section>
  )
}

// Politique de confidentialité (RGPD) et cookies (lignes directrices et recommandation CNIL).
export function Confidentialite() {
  return (
    <section className="section legal" id="confidentialite">
      <div className="container legal__wrap">
        <Block title="En résumé">
          <ul>
            <li>Ce site ne comporte aucun formulaire et ne collecte aucune donnée de santé.</li>
            <li>Il n’utilise ni outil de mesure d’audience, ni publicité, ni réseau social.</li>
            <li>Aucun cookie n’est déposé sans votre accord.</li>
            <li>La prise de rendez-vous se fait sur Doctolib, qui est responsable des données que vous y saisissez.</li>
          </ul>
        </Block>

        <Block title="Responsable du traitement">
          <p>
            {LEGAL.editeur}, {CABINET.street}, {CABINET.city}. Contact : <a href={CABINET.phoneHref}>{CABINET.phone}</a>
            {' · '}
            <Todo value={LEGAL.email}>adresse e-mail du cabinet</Todo>
          </p>
        </Block>

        <Block title="Données traitées lors de votre visite">
          <p>
            Comme pour tout site, l’hébergeur enregistre des journaux techniques (adresse IP, date, page consultée,
            navigateur) nécessaires à la sécurité et au bon fonctionnement du site. Base légale : intérêt légitime.
            Durée de conservation : 12 mois au plus. Destinataire : l’hébergeur (voir les mentions légales).
          </p>
          <p>
            Les polices de caractères sont hébergées avec le site : aucune requête n’est envoyée à Google Fonts.
          </p>
        </Block>

        <Block title="Cookies et stockage local">
          <p>Le site n’utilise que des éléments strictement nécessaires, exemptés de consentement :</p>
          <ul>
            <li>
              un indicateur en mémoire de session pour ne jouer l’animation d’accueil qu’une fois par visite ;
            </li>
            <li>votre choix d’afficher la carte, s’il y a lieu, conservé dans votre navigateur.</li>
          </ul>
          <p>
            <strong>Carte Google Maps.</strong> La carte du plan d’accès n’est chargée que si vous cliquez sur « Afficher
            la carte ». Google peut alors déposer des cookies et recevoir votre adresse IP, selon sa{' '}
            <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noreferrer">
              politique de confidentialité
            </a>
            . Pour retirer votre accord, effacez les données du site dans votre navigateur.
          </p>
        </Block>

        <Block title="Liens externes">
          <p>
            Les liens vers Doctolib, Google Maps, santé.fr ou ameli.fr ouvrent des sites tiers, soumis à leurs propres
            politiques de confidentialité.
          </p>
        </Block>

        <Block title="Vos droits">
          <p>
            Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition sur vos
            données. Pour l’exercer, contactez le cabinet. Si vous estimez que vos droits ne sont pas respectés, vous
            pouvez adresser une réclamation à la{' '}
            <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">
              CNIL
            </a>
            .
          </p>
          <p>
            Vos données médicales, lorsque vous êtes patient du cabinet, sont traitées au cabinet dans le respect du secret
            médical ; elles ne transitent jamais par ce site.
          </p>
        </Block>

        <p className="legal__updated">Dernière mise à jour : octobre 2026.</p>
      </div>
    </section>
  )
}

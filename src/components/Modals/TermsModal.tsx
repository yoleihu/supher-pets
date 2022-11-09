import { Dialog } from "@headlessui/react";

interface TermsModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white p-6">
            <Dialog.Title className="font-semibold text-2xl mb-5">Termos e condições gerais de uso da plataforma SUPHER Pets</Dialog.Title>
            <Dialog.Description className="flex flex-col justify-between">
              <p>
                Os serviços do SUPHER Pets são fornecidos pela pessoa jurídica com a seguinte Razão
                Social: Sistema de União Para Hemocentros E Responsáveis por Pets Ltda, com nome
                fantasia SUPHER Pets inscrito no CNPJ sob o nº 99.999.999/9999-99, titular da
                propriedade intelectual sobre website, conteúdos e demais ativos relacionados à
                plataforma SUPHER Pets.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                1. Do objeto
              </h3>
              <br />
              <p>
                A plataforma visa licenciar o uso de seu website e demais ativos de propriedade intelectual,
                fornecendo ferramentas para auxiliar e dinamizar o dia a dia dos seus usuários.
                <br />
                A plataforma caracteriza-se pela prestação do seguinte serviço: Prestação de serviços de
                divulgação/marketing digital dirigido a um público-alvo específico.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                2. Da aceitação
              </h3>
              <br />
              <p>
                O presente Termo estabelece obrigações contratadas de livre e espontânea vontade, por
                tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do OU
                site OU aplicativo. <br />
                Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e
                compromete-se a observá-las, sob o risco de aplicação das penalidades cabíveis. <br />
                A aceitação do presente instrumento é imprescindível para o acesso e para a utilização de
                quaisquer serviços fornecidos pela empresa. Caso não concorde com as disposições deste
                instrumento, o usuário não deve utilizá-los.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                3. Do acesso dos usuários
              </h3>
              <br />
              <p>
                Serão utilizadas todas as soluções técnicas à disposição do responsável pela plataforma
                para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por
                semana. No entanto, a navegação na plataforma ou em alguma de suas páginas poderá ser
                interrompida, limitada ou suspensa para atualizações, modificações ou qualquer ação
                necessária ao seu bom funcionamento.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                4. Do cadastro
              </h3>
              <br />
              <p>
                O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio e, a
                depender dos serviços ou produtos escolhidos, o pagamento de determinado valor. <br />
                Ao se cadastrar o usuário deverá informar dados completos, recentes e válidos, sendo de
                sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se
                compromete com a veracidade dos dados fornecidos. <br />
                O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à
                plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito. <br />
                Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter
                previamente o consentimento expresso de seus responsáveis legais para utilização da
                plataforma e dos serviços ou produtos, sendo de responsabilidade exclusiva dos mesmos o
                eventual acesso por menores de idade e por aqueles que não possuem plena capacidade
                civil sem a prévia autorização. <br />
                Mediante a realização do cadastro o usuário declara e garante expressamente ser
                plenamente capaz, podendo exercer e usufruir livremente dos serviços e produtos. <br />
                O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará
                todas as comunicações necessárias. <br />
                Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual
                assegura ao usuário o acesso individual à mesma. Desta forma, compete ao usuário
                exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando
                o acesso indevido às informações pessoais. <br />
                Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do
                usuário, que deverá informar prontamente a plataforma em caso de uso indevido da
                respectiva senha. <br />
                Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é
                pessoal e intransferível. <br />
                Caberá ao usuário assegurar que o seu equipamento seja compatível com as características
                técnicas que viabilize a utilização da plataforma e dos serviços ou produtos. <br />
                O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao site
                SUPHER Pets. O seu descadastramento será realizado o mais rapidamente possível, desde
                que não sejam verificados débitos em aberto. <br />
                O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a
                plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do
                uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações
                preenchidas pelo usuário quando realizar ou atualizar seu cadastro, além de outras
                expressamente descritas na Política de Privacidade que deverá ser autorizada pelo usuário. <br />
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                5. Do suporte
              </h3>
              <br />
              <p>
                Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, o
                usuário poderá entrar em contato com o suporte, através do e-mail supherpets@gmail.com. <br />
                Estes serviços de atendimento ao usuário estarão disponíveis nos seguintes dias e horários:
                Segunda à sexta-feira das 09h00 às 18h00.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                6. Das responsabilidades
              </h3>
              <br />
              <p>
                É de responsabilidade do usuário: <br /> <br />
                a) defeitos ou vícios técnicos originados no próprio sistema do usuário; <br />
                b) a correta utilização da plataforma, dos serviços ou produtos oferecidos, prezando pela
                boa convivência, pelo respeito e cordialidade entre os usuários; <br />
                c) pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições
                Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional; <br />
                d) pela proteção aos dados de acesso à sua conta/perfil (login e senha). <br /> <br />
                É de responsabilidade da plataforma SUPHER Pets: <br /> <br />
                a) indicar as características do serviço ou produto; <br />
                b) os defeitos e vícios encontrados no serviço ou produto oferecido desde que lhe tenha
                dado causa; <br />
                c) as informações que foram por ele divulgadas, sendo que os comentários ou informações
                divulgadas por usuários são de inteira responsabilidade dos próprios usuários; <br />
                d) os conteúdos ou atividades ilícitas praticadas através da sua plataforma. <br /> <br />
                A plataforma não se responsabiliza por links externos contidos em seu sistema que possam
                redirecionar o usuário à ambiente externo a sua rede. <br />
                Não poderão ser incluídos links externos ou páginas que sirvam para fins comerciais ou
                publicitários ou quaisquer informações ilícitas, violentas, polêmicas, pornográficas,
                xenofóbicas, discriminatórias ou ofensivas.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                7. Dos direitos autorais
              </h3>
              <br />
              <p>

              </p>
              <br />
              <h3 className="font-semibold text-lg">
                8. Das sanções
              </h3>
              <br />
              <p>
                Sem prejuízo das demais medidas legais cabíveis, a razão social Sistema de União Para
                Hemocentros E Responsáveis por Pets Ltda poderá, a qualquer momento, advertir,
                suspender ou cancelar a conta do usuário: <br /> <br />
                a) que violar qualquer dispositivo do presente Termo; <br />
                b) que descumprir os seus deveres de usuário; <br />
                c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                9. Das alterações
              </h3>
              <br />
              <p>
                Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a
                qualquer tempo, por parte da plataforma, para adequar ou modificar os serviços, bem como
                para atender novas exigências legais. As alterações serão veiculadas pelo site SUPHER Pets
                e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços,
                caso seja assinante de algum serviço. <br />
                Os serviços oferecidos podem, a qualquer tempo e unilateralmente, e sem qualquer aviso
                prévio, ser deixados de fornecer, alterados em suas características, bem como restringido
                para o uso ou acesso. <br />
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                10. Da política de privacidade
              </h3>
              <br />
              <p>
                Além do presente Termo, o usuário deverá consentir com as disposições contidas na
                respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da
                interface da plataforma.
              </p>
              <br />
              <h3 className="font-semibold text-lg">
                11. Do foro
              </h3>
              <br />
              <p>
                Para a solução de controvérsias decorrentes do presente instrumento será aplicado
                integralmente o Direito brasileiro. <br />
                Os eventuais litígios deverão ser apresentados no foro da comarca em que se
                encontra a sede da empresa.
              </p>

              <div className="w-full flex justify-end mt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
                >
                  Fechar
                </button>
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
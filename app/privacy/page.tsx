import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "포메 개인정보처리방침",
};

function Section({
  no,
  title,
  children,
}: {
  no: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">
        {no}. {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <tbody>
          {rows.map(([k, v]) => (
            <tr
              key={k}
              className="border-b border-zinc-200 last:border-0 dark:border-zinc-800"
            >
              <td className="w-40 shrink-0 py-2.5 pr-4 align-top font-medium text-zinc-800 dark:text-zinc-200">
                {k}
              </td>
              <td className="py-2.5 text-zinc-600 dark:text-zinc-400">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-16 md:py-24">
      <header className="mb-12 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {SITE.appName} ({SITE.appNameKo})
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          개인정보처리방침
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          시행일: 2026년 7월 26일
        </p>
      </header>

      <div className="space-y-10">
        <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {SITE.teamName}(이하 &ldquo;팀&rdquo;)은 공부 집중 측정 서비스
          {" "}
          {SITE.appName}(이하 &ldquo;서비스&rdquo;)을 제공하면서 이용자의
          개인정보를 소중하게 다루며, 「개인정보 보호법」 등 관련 법령을
          준수합니다. 본 방침은 서비스가 어떤 정보를 왜 수집하고, 어떻게
          보관하며, 이용자가 어떤 권리를 갖는지 설명합니다.
        </p>

        <Section no={1} title="수집하는 정보와 수집 방법">
          <p>
            서비스는 별도의 회원가입 없이 사용할 수 있으며, 이름, 이메일,
            전화번호 같은 연락처 정보를 요구하지 않습니다. 수집하는 항목은
            다음과 같습니다.
          </p>
          <Table
            rows={[
              [
                "기기 식별자",
                "앱 최초 실행 시 자동 생성되는 무작위 식별자(UUID). 기기를 구분해 공부 기록을 이어 주는 용도로만 사용하며, 이용자의 실명이나 연락처와 연결되지 않습니다.",
              ],
              [
                "공부 기록",
                "공부 세션의 시작·종료 시각, 총 시간, 순공 시간, 집중 상태 이벤트(자리 비움, 휴대폰 사용 등)의 유형과 발생 시각",
              ],
              [
                "카메라 영상",
                "집중 상태 판별을 위해 기기 내에서만 실시간 분석하며, 영상이나 사진을 저장하거나 서버로 전송하지 않습니다. 저장되는 것은 분석 결과인 상태 이벤트 기록뿐입니다.",
              ],
              [
                "문의 내용",
                "앱 내 문의 기능을 이용할 때 이용자가 작성한 내용과 회신을 위해 이용자가 직접 입력한 연락처",
              ],
              [
                "서비스 이용 기록",
                "접속 IP 주소, 접속 일시, 서비스 이용 기록",
              ],
            ]}
          />
          <p>
            서비스는 광고를 게재하지 않으며, 광고 식별자(Android 광고 ID,
            iOS IDFA)를 수집하거나 이용하지 않습니다.
          </p>
        </Section>

        <Section no={2} title="카메라 영상의 처리">
          <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            카메라 영상은 집중 상태를 감지하기 위해 기기 안에서만 분석되며,
            영상이나 사진이 서버로 전송되거나 저장되는 일은 없습니다.
          </p>
          <p>
            서비스는 공부 상태(집중, 자리 비움, 휴대폰 사용)를 판별하기 위해
            기기 내(온디바이스) AI로 카메라 영상을 분석합니다. 분석 결과로
            만들어지는 것은 상태 이벤트 기록(예: &ldquo;몇 시 몇 분부터 몇 분간
            자리 비움&rdquo;)뿐이며, 원본 영상은 어디에도 남지 않습니다.
          </p>
          <p>
            서비스는 사람의 존재 여부와 자세·시선 방향만을 판별하며, 얼굴을
            식별하거나 개인을 특정할 수 있는 생체인식정보를 생성하거나
            저장하지 않습니다. 따라서 서비스는 「개인정보 보호법」상
            민감정보에 해당하는 생체인식정보를 처리하지 않습니다.
          </p>
          <p>
            카메라 사용은 이용자가 측정을 시작한 경우에만 이루어지며, 측정을
            종료하면 즉시 중단됩니다.
          </p>
        </Section>

        <Section no={3} title="수집한 정보의 이용 목적">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>순공 시간 측정과 공부 세션 기록 제공</li>
            <li>일간·주간·월간 공부 통계와 스트릭(연속 기록) 제공</li>
            <li>기기 내 데이터 손실 시 기존 공부 기록의 복원 및 연속 제공</li>
            <li>문의 접수 및 응대</li>
            <li>서비스 오류 진단 및 품질 개선</li>
            <li>부정 이용 방지 및 서버 안정성 확보</li>
          </ul>
        </Section>

        <Section no={4} title="보유 및 이용 기간">
          <p>
            수집한 정보는 서비스 제공 기간 동안 보유하며, 아래 연락처로
            삭제를 요청하면 지체 없이 파기합니다.
          </p>
          <p>
            다만 다음의 경우에는 예외적으로 해당 기간 동안 보관한 후
            파기합니다.
          </p>
          <Table
            rows={[
              [
                "문의 및 응대 기록",
                "3년 (「전자상거래 등에서의 소비자보호에 관한 법률」)",
              ],
              [
                "서비스 이용 기록(접속 IP, 접속 일시)",
                "3개월 (부정 이용 방지 및 장애 대응을 위한 내부 방침)",
              ],
              ["법령에 따른 보존 의무가 있는 정보", "해당 법령이 정한 기간"],
            ]}
          />
        </Section>

        <Section no={5} title="파기 절차 및 방법">
          <p>
            보유 기간이 지나거나 처리 목적이 달성된 정보는 지체 없이
            파기합니다.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              전자적 파일 형태의 정보: 복구 및 재생이 불가능한 방법으로 영구
              삭제합니다.
            </li>
            <li>
              이용자의 삭제 요청: 이용자가 아래 연락처로 삭제를 요청하면,
              해당 기기 식별자와 이에 연결된 모든 공부 기록이 서버에서
              지체 없이 삭제됩니다.
            </li>
          </ul>
          <p>
            백업본에 남아 있는 정보는 백업 보관 주기에 따라 최대 7일 이내에
            삭제됩니다.
          </p>
        </Section>

        <Section no={6} title="제3자 제공">
          <p>
            팀은 이용자의 정보를 외부에 제공하지 않습니다. 다만 법령에 근거한
            수사기관의 적법한 요청이 있는 경우는 예외로 합니다.
          </p>
        </Section>

        <Section no={7} title="처리 위탁">
          <p>서비스 제공을 위해 다음 업무를 외부에 위탁하고 있습니다.</p>
          <Table
            rows={[
              [
                "Amazon Web Services, Inc.",
                "서버 운영 및 데이터 보관 / 대한민국(아시아 태평양 서울 리전)",
              ],
            ]}
          />
          <p>
            팀은 위탁 계약 시 관련 법령에 따라 개인정보 보호에 관한 책임,
            재위탁 제한, 안전성 확보 조치 등을 문서에 명시하고, 수탁자가 이를
            준수하는지 감독합니다.
          </p>
        </Section>

        <Section no={8} title="개인정보의 국외 이전">
          <p>서비스는 개인정보를 국외로 이전하지 않습니다.</p>
          <p>
            서비스가 수집한 정보는 Amazon Web Services의 대한민국 서울
            리전(ap-northeast-2)에 보관되며, 국외의 서버로 이전되거나 저장되지
            않습니다.
          </p>
        </Section>

        <Section no={9} title="이용자의 권리와 행사 방법">
          <p>
            이용자는 언제든지 자신의 공부 기록에 대한 열람·삭제를 요청할 수
            있습니다.
          </p>
          <p>
            서비스는 익명 기기 식별자를 기준으로 운영되며, 별도의 로그인
            계정이 없어 앱 내에서 자동으로 삭제를 처리하는 기능은 제공하지
            않습니다. 삭제를 원하시면 아래 연락처로 요청해 주시기 바랍니다.
            다만 서비스가 실명이나 연락처를 보관하지 않으므로, 본인 확인을
            위해 해당 기기의 식별자 정보가 필요할 수 있습니다.
          </p>
          <p>
            이용자는 개인정보 처리에 대한 열람, 정정·삭제, 처리정지를 요구할
            권리가 있으며, 팀은 요청을 받은 날부터 10일 이내에 처리합니다.
          </p>
        </Section>

        <Section no={10} title="만 14세 미만 아동의 개인정보">
          <p>서비스는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.</p>
          <p>
            서비스는 광고를 게재하지 않으며, 이름·이메일·전화번호 등 개인을
            식별할 수 있는 정보를 수집하지 않습니다. 수집하는 정보는 기기에서
            자동 생성되는 무작위 식별자와 공부 시간 기록에 한정됩니다.
          </p>
          <p>
            만 14세 미만 아동의 개인정보가 법정대리인의 동의 없이 수집된
            사실이 확인되면 지체 없이 파기합니다. 법정대리인은 아래 연락처를
            통해 해당 아동의 정보 삭제를 요청할 수 있습니다.
          </p>
        </Section>

        <Section no={11} title="안전성 확보 조치">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>이름, 이메일, 전화번호 등 연락처 정보를 요구하지 않는 최소 수집 원칙</li>
            <li>전송 구간 암호화(HTTPS/TLS) 적용</li>
            <li>서버 접근 권한 최소화 및 접근 통제</li>
            <li>접속 기록의 보관 및 위·변조 방지</li>
            <li>개인정보 처리 시스템에 대한 정기적인 점검</li>
          </ul>
        </Section>

        <Section no={12} title="개인정보 보호책임자">
          <p>
            개인정보 처리에 관한 문의, 열람·삭제 요청, 불만 처리는 아래로
            접수할 수 있습니다.
          </p>
          <Table
            rows={[
              ["성명", "KSJ, HSK, HWI"],
              ["직책", "개인정보 보호책임자"],
              ["소속", SITE.teamName],
              ["이메일", SITE.supportEmail],
            ]}
          />
        </Section>

        <Section no={13} title="권익침해 구제 방법">
          <p>
            개인정보 침해로 인한 상담이나 피해 구제가 필요한 경우 아래 기관에
            문의할 수 있습니다.
          </p>
          <Table
            rows={[
              ["개인정보분쟁조정위원회", "1833-6972 · www.kopico.go.kr"],
              ["개인정보침해신고센터", "(국번없이) 118 · privacy.kisa.or.kr"],
              ["대검찰청 사이버수사과", "(국번없이) 1301 · www.spo.go.kr"],
              ["경찰청 사이버수사국", "(국번없이) 182 · ecrm.police.go.kr"],
            ]}
          />
        </Section>

        <Section no={14} title="방침의 변경">
          <p>
            본 방침의 내용이 추가되거나 변경되는 경우, 시행 7일 전부터 앱 내
            공지 또는 본 페이지를 통해 알립니다. 다만 이용자의 권리에 중대한
            영향을 미치는 변경의 경우 시행 30일 전부터 알립니다.
          </p>
        </Section>
      </div>

      <footer className="mt-16 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Link href="/" className="underline underline-offset-4">
          {SITE.appName} 홈으로
        </Link>
      </footer>
    </main>
  );
}

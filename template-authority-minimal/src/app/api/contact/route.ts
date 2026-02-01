import { NextRequest, NextResponse } from "next/server";

// フォームデータの型定義
interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  inquiryType: string;
  budget?: string;
  timeline?: string;
  message: string;
  privacy: boolean;
}

// バリデーションエラーの型
interface ValidationError {
  field: string;
  message: string;
}

// バリデーション関数
function validateFormData(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push({ field: "name", message: "お名前を入力してください" });
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push({ field: "email", message: "メールアドレスを入力してください" });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "正しいメールアドレスを入力してください" });
  }

  if (!data.inquiryType) {
    errors.push({ field: "inquiryType", message: "お問い合わせ種別を選択してください" });
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push({ field: "message", message: "お問い合わせ内容を入力してください" });
  }

  if (!data.privacy) {
    errors.push({ field: "privacy", message: "プライバシーポリシーに同意してください" });
  }

  return errors;
}

// お問い合わせ種別のラベル
function getInquiryTypeLabel(type: string): string {
  const types: Record<string, string> = {
    new_project: "新規プロジェクトのご相談",
    improvement: "既存サイト・ブランドの改善",
    branding: "ブランディング・戦略について",
    other: "その他",
  };
  return types[type] || type;
}

// 予算のラベル
function getBudgetLabel(budget: string): string {
  const budgets: Record<string, string> = {
    under_50: "50万円未満",
    "50_100": "50万円〜100万円",
    "100_300": "100万円〜300万円",
    "300_500": "300万円〜500万円",
    over_500: "500万円以上",
    undecided: "未定・相談したい",
  };
  return budgets[budget] || budget || "未選択";
}

// 時期のラベル
function getTimelineLabel(timeline: string): string {
  const timelines: Record<string, string> = {
    asap: "なるべく早く",
    "1month": "1ヶ月以内",
    "3months": "3ヶ月以内",
    "6months": "半年以内",
    undecided: "時期は未定",
  };
  return timelines[timeline] || timeline || "未選択";
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // バリデーション
    const errors = validateFormData(data);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // ============================================
    // メール送信処理
    // ============================================
    //
    // 実際の運用では、以下のいずれかのメール送信サービスを使用してください：
    //
    // 1. Resend (推奨)
    //    npm install resend
    //    https://resend.com/
    //
    // 2. SendGrid
    //    npm install @sendgrid/mail
    //    https://sendgrid.com/
    //
    // 3. Nodemailer (SMTPサーバー使用)
    //    npm install nodemailer
    //
    // 以下はResendを使用する場合の例：
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'noreply@example.com',
    //   to: 'info@example.com',
    //   subject: `【お問い合わせ】${getInquiryTypeLabel(data.inquiryType)}`,
    //   text: `
    //     お名前: ${data.name}
    //     会社名: ${data.company || '未入力'}
    //     メールアドレス: ${data.email}
    //     電話番号: ${data.phone || '未入力'}
    //     お問い合わせ種別: ${getInquiryTypeLabel(data.inquiryType)}
    //     ご予算: ${getBudgetLabel(data.budget || '')}
    //     ご希望の時期: ${getTimelineLabel(data.timeline || '')}
    //
    //     お問い合わせ内容:
    //     ${data.message}
    //   `,
    // });
    // ============================================

    // 現時点ではログ出力のみ（開発用）
    console.log("=== お問い合わせを受信しました ===");
    console.log(`お名前: ${data.name}`);
    console.log(`会社名: ${data.company || "未入力"}`);
    console.log(`メールアドレス: ${data.email}`);
    console.log(`電話番号: ${data.phone || "未入力"}`);
    console.log(`お問い合わせ種別: ${getInquiryTypeLabel(data.inquiryType)}`);
    console.log(`ご予算: ${getBudgetLabel(data.budget || "")}`);
    console.log(`ご希望の時期: ${getTimelineLabel(data.timeline || "")}`);
    console.log(`お問い合わせ内容:\n${data.message}`);
    console.log("================================");

    return NextResponse.json({
      success: true,
      message: "お問い合わせを受け付けました。2営業日以内にご連絡いたします。",
    });
  } catch (error) {
    console.error("お問い合わせ処理エラー:", error);
    return NextResponse.json(
      {
        success: false,
        message: "送信中にエラーが発生しました。時間をおいて再度お試しください。",
      },
      { status: 500 }
    );
  }
}

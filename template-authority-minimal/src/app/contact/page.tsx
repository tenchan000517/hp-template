'use client';

import { useState } from 'react';
import Link from 'next/link';
import { pages } from '@/lib/site';

export default function ContactPage() {
  const { contact } = pages;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // フォーム送信処理（実際の運用時はAPIエンドポイントに送信）
    // 例: await fetch('/api/contact', { method: 'POST', body: formData });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <>
        <section className="pt-[50vh] min-h-screen lg:pt-[55vh] pb-20">
          <div className="container-content">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              {contact.thanks.title.en}
            </span>
            <h1 className="mt-4 font-mincho text-[28px] lg:text-[40px] tracking-[0.1em] text-main">
              {contact.thanks.title.ja}
            </h1>
            <p className="mt-12 text-body whitespace-pre-line leading-[2.0]">
              {contact.thanks.message}
            </p>
            <div className="mt-16">
              <Link href={contact.thanks.backLink.href} className="text-link text-link-arrow">
                {contact.thanks.backLink.text}
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[60vh] lg:pt-[55vh] pb-16 lg:pb-20">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            {contact.title.en}
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            {contact.title.ja}
          </h1>
          <p className="mt-10 font-mincho text-[18px] lg:text-[22px] leading-[1.8] text-body-color whitespace-pre-line">
            {contact.lead}
          </p>
          <p className="mt-8 text-[14px] text-sub whitespace-pre-line">
            {contact.responseTime}
          </p>
        </div>
      </section>

      {/* セクション2: フォーム */}
      <section className="section-normal bg-gray">
        <div className="container-content max-w-[680px]">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* お問い合わせ種別 */}
            <div>
              <label className="form-label">
                お問い合わせ種別
                <span className="form-required">*</span>
              </label>
              <div className="mt-4 space-y-3">
                {contact.inquiryTypes.map((type) => (
                  <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="inquiryType"
                      value={type.value}
                      required
                      className="w-4 h-4 accent-main"
                    />
                    <span className="text-[15px] text-body-color">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 会社名・組織名 */}
            <div>
              <label htmlFor="company" className="form-label">
                会社名・組織名
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="form-input mt-2"
                placeholder="例：株式会社〇〇"
              />
            </div>

            {/* お名前 */}
            <div>
              <label htmlFor="name" className="form-label">
                お名前
                <span className="form-required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input mt-2"
                placeholder="例：山田 太郎"
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="form-label">
                メールアドレス
                <span className="form-required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-input mt-2"
                placeholder="例：info@example.com"
              />
            </div>

            {/* 電話番号 */}
            <div>
              <label htmlFor="phone" className="form-label">
                電話番号
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input mt-2"
                placeholder="例：03-0000-0000"
              />
            </div>

            {/* ご予算 */}
            <div>
              <label htmlFor="budget" className="form-label">
                ご予算
              </label>
              <select
                id="budget"
                name="budget"
                className="form-input mt-2"
              >
                {contact.budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* ご希望の時期 */}
            <div>
              <label htmlFor="timeline" className="form-label">
                ご希望の時期
              </label>
              <select
                id="timeline"
                name="timeline"
                className="form-input mt-2"
              >
                {contact.timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="form-label">
                お問い合わせ内容
                <span className="form-required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={8}
                className="form-textarea mt-2"
                placeholder="プロジェクトの概要や、ご相談したい内容をお聞かせください。"
              />
            </div>

            {/* プライバシーポリシー同意 */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  className="mt-1 w-4 h-4 accent-main"
                />
                <span className="text-[14px] text-body-color">
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-main">
                    プライバシーポリシー
                  </Link>
                  に同意する
                </span>
              </label>
            </div>

            {/* 送信ボタン */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit"
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

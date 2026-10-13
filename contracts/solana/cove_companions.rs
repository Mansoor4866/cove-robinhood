// ==============================================================================
// 🏹 Cove Companions — Solana Anchor Smart Program
// Network: Solana (Devnet / Mainnet)
// Description: On-chain Sovereign AI Companion NFT & State Management Protocol
// ==============================================================================

use anchor_lang::prelude::*;

declare_id!("CoveComp11111111111111111111111111111111111");

#[program]
pub mod cove_companions {
    use super::*;

    /// Initialize user's companion state PDA on Solana
    pub fn hatch_companion(
        ctx: Context<HatchCompanion>,
        name: String,
        species: String,
        role: String,
        twitter_handle: String,
    ) -> Result<()> {
        require!(name.len() <= 32, CoveError::NameTooLong);
        require!(species.len() <= 32, CoveError::SpeciesTooLong);
        require!(role.len() <= 32, CoveError::RoleTooLong);
        require!(twitter_handle.len() <= 32, CoveError::HandleTooLong);

        let companion = &mut ctx.accounts.companion_account;
        let clock = Clock::get()?;

        companion.owner = ctx.accounts.authority.key();
        companion.name = name.clone();
        companion.species = species.clone();
        companion.role = role.clone();
        companion.twitter_handle = twitter_handle.clone();
        companion.level = 1;
        companion.exp = 0;
        companion.hunger = 100;
        companion.last_fed_timestamp = clock.unix_timestamp;
        companion.hatched_at = clock.unix_timestamp;
        companion.bump = ctx.bumps.companion_account;

        emit!(CompanionHatchedEvent {
            owner: ctx.accounts.authority.key(),
            name,
            species,
            role,
            twitter_handle,
            timestamp: clock.unix_timestamp,
        });

        Ok(())
    }

    /// Feed companion on Solana with cooldown
    pub fn feed_companion(ctx: Context<FeedCompanion>) -> Result<()> {
        let companion = &mut ctx.accounts.companion_account;
        let clock = Clock::get()?;

        let cooldown_seconds = 14400; // 4 hours cooldown
        require!(
            clock.unix_timestamp - companion.last_fed_timestamp >= cooldown_seconds,
            CoveError::FeedingCooldownActive
        );

        companion.hunger = 100;
        companion.exp += 35;
        companion.last_fed_timestamp = clock.unix_timestamp;

        // Level up if threshold reached
        let required_exp = (companion.level as u64) * 100;
        if companion.exp >= required_exp {
            companion.level += 1;
            emit!(LevelUpEvent {
                owner: companion.owner,
                new_level: companion.level,
            });
        }

        emit!(CompanionFedEvent {
            owner: companion.owner,
            new_hunger: companion.hunger,
            new_exp: companion.exp,
            timestamp: clock.unix_timestamp,
        });

        Ok(())
    }
}

// ------------------------------------------------------------------------------
// Account Validation Contexts
// ------------------------------------------------------------------------------

#[derive(Accounts)]
#[instruction(name: String, species: String, role: String, twitter_handle: String)]
pub struct HatchCompanion<'info> {
    #[account(
        init,
        payer = authority,
        space = CompanionAccount::LEN,
        seeds = [b"companion", authority.key().as_ref()],
        bump
    )]
    pub companion_account: Account<'info, CompanionAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FeedCompanion<'info> {
    #[account(
        mut,
        seeds = [b"companion", authority.key().as_ref()],
        bump = companion_account.bump,
        has_one = authority @ CoveError::UnauthorizedOwner
    )]
    pub companion_account: Account<'info, CompanionAccount>,

    pub authority: Signer<'info>,
}

// ------------------------------------------------------------------------------
// On-Chain State Structure (PDA)
// ------------------------------------------------------------------------------

#[account]
pub struct CompanionAccount {
    pub owner: Pubkey,            // 32
    pub name: String,             // 4 + 32
    pub species: String,          // 4 + 32
    pub role: String,             // 4 + 32
    pub twitter_handle: String,   // 4 + 32
    pub level: u16,               // 2
    pub exp: u64,                 // 8
    pub hunger: u8,               // 1
    pub last_fed_timestamp: i64,  // 8
    pub hatched_at: i64,          // 8
    pub bump: u8,                 // 1
}

impl CompanionAccount {
    pub const LEN: usize = 8 + 32 + (4 + 32) * 4 + 2 + 8 + 1 + 8 + 8 + 1 + 64; // safe buffer
}

// ------------------------------------------------------------------------------
// Program Events
// ------------------------------------------------------------------------------

#[event]
pub struct CompanionHatchedEvent {
    pub owner: Pubkey,
    pub name: String,
    pub species: String,
    pub role: String,
    pub twitter_handle: String,
    pub timestamp: i64,
}

#[event]
pub struct CompanionFedEvent {
    pub owner: Pubkey,
    pub new_hunger: u8,
    pub new_exp: u64,
    pub timestamp: i64,
}

#[event]
pub struct LevelUpEvent {
    pub owner: Pubkey,
    pub new_level: u16,
}

// ------------------------------------------------------------------------------
// Custom Errors
// ------------------------------------------------------------------------------

#[error_code]
pub enum CoveError {
    #[msg("Companion name exceeds maximum 32 bytes.")]
    NameTooLong,
    #[msg("Species name exceeds maximum 32 bytes.")]
    SpeciesTooLong,
    #[msg("Role name exceeds maximum 32 bytes.")]
    RoleTooLong,
    #[msg("Twitter handle exceeds maximum 32 bytes.")]
    HandleTooLong,
    #[msg("Companion is not hungry yet. Cooldown is active.")]
    FeedingCooldownActive,
    #[msg("Signer does not own this companion on Solana.")]
    UnauthorizedOwner,
}
